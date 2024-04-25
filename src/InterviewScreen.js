import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { child, get, getDatabase, ref } from "firebase/database";
import * as Components from "./AudioComponents.js";
import axios from "axios";
import { set, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import loader from "./assets/loader.gif";
import Timer from "./Timer.js";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { ref as sRef } from "firebase/storage";
import { BounceLoader } from "react-spinners";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const StyledTextInput = styled.textarea`
  width: 70%;
  height: 200px; /* Adjust height to fit 10 lines */
  padding: 10px;
  border: none;
  background-color: #f3f3f3;
  border-radius: 5px;
  box-shadow: 7px 4px 37px -15px rgba(0, 0, 0, 0.89);
  outline: none;
  resize: vertical; /* Allow vertical resizing */
`;

function VideoInterview(props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null); // Set initial state to null
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [apiLink, setApiLink] = useState(
    "http://127.0.0.1:8080/video_feed_real"
  );
  const [interviewer, setInterviewer] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewLink, setPreviewLink] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [videoResponse, setVideoResponse] = useState(null);
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const recorderControls = useAudioRecorder();

  const goBack = () => navigate("/auth/candidate");

  const { state } = useLocation();
  const { paramName } = state;
  console.log(paramName);
  useEffect(() => {
    // alert(
    //     "This is a mock interview consisting 3 sections Video, audio, and text answers. At the end, you will be able to check the complete report for your answers."
    // );
    const fetchData = async () => {
      const dbRef = ref(getDatabase());
      const snapshot = await get(
        child(dbRef, "interviews/" + paramName + "/questions")
      );
      if (snapshot.exists()) {
        const interviewsData = [];
        snapshot.forEach((childSnapshot) => {
          interviewsData.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setQuestions(interviewsData);
        setQuestion(interviewsData[0]); // Set the initial question after fetching data
        if (interviewsData[0].section == "text") {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          const newTimeoutId = setTimeout(
            uploadTextToFirebase,
            parseInt(interviewsData[0].timeLimit) * 60 * 1000
          );
          setTimeoutId(newTimeoutId);
        }
      }
      const snapshot2 = await get(child(dbRef, "interviews/" + paramName));
      if (snapshot2.exists()) {
        console.log(snapshot2.val().creator);
        setInterviewer(snapshot2.val().creator); // Set the initial question after fetching data
      }
    };

    fetchData();
  }, []);

  const addAudioElement = (blob) => {
    // Upload audio to Firebase Storage
    setLoading(true);
    uploadAudioToFirebase(blob);
  };

  // Function to cancel the timeout
  const cancelTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null); // Clear the timeout ID from state
    }
  };

  const startRecording = () => {
    if (question.section === "video") {
      setIsRecording(true);
      setPreviewLink("");
      setPreview(false);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(() => {
        submitRecording();
      }, parseInt(question.timeLimit) * 60 * 1000);
      setTimeoutId(newTimeoutId);
    } else if (question.section === "audio") {
    }

    if (question.section === "text") {
      uploadTextToFirebase();
    }
  };

  const uploadTextToFirebase = async () => {
    try {
      // Make a POST request for text analysis
      const response = await axios.post(
        "http://127.0.0.1:8080/personality_detection",
        {
          text: document.getElementById("textbox_id").value,
        }
      );

      console.log("Text analysis response:", response.data);

      // Check if response data contains emotion
      if (response.data) {
        console.log("Text analysis response:", response.data);
        setNumberOfAttempts(numberOfAttempts + 1);
        setPreview(true);
        setPreviewLink(response.data.text);

        // Upload text response and analysis to Firebase Firestore
        const db = getDatabase();
        set(
          ref(
            db,
            "completed-interviews/" +
              "/" +
              interviewer +
              "/" +
              paramName +
              "/" +
              auth.currentUser.uid +
              "/" +
              questionIndex
          ),
          {
            creator: auth.currentUser.uid,
            candidate: auth.currentUser.uid,
            questionId: questionIndex,
            section: questions[questionIndex].section,
            question: questions[questionIndex],
            questionContent: questions[questionIndex].question,
            response: {
              text: document.getElementById("textbox_id").value,
              analysis: response.data, // Assuming response.data contains analysis results
            },
            numberOfAttempts: numberOfAttempts,
          }
        );
        setAnswer("");
      } else {
        console.error("No result received from text analysis");
      }
    } catch (error) {
      console.error("Error during text analysis:", error);
    }
  };

  const reSubmitText = (question) => {
    setPreview(false);
    setPreviewLink("");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(
      uploadTextToFirebase,
      parseInt(question.timeLimit) * 60 * 1000
    );
    setTimeoutId(newTimeoutId);
  };

  const uploadTextToFirebaseFinal = async (textResponse) => {
    try {
      // Make a POST request for text analysis
      const response = await axios.post(
        "http://127.0.0.1:8080/personality_detection",
        {
          text: textResponse,
        }
      );

      console.log("Text analysis response:", response.data);

      // Check if response data contains emotion
      if (response.data) {
        console.log("Text analysis response:", response.data);
        setPreview(false);
        setPreviewLink("");
        cancelTimeout();
        setNumberOfAttempts(numberOfAttempts + 1);
        // Upload text response and analysis to Firebase Firestore
        const db = getDatabase();
        set(
          ref(
            db,
            "completed-interviews/" +
              "/" +
              interviewer +
              "/" +
              paramName +
              "/" +
              auth.currentUser.uid +
              "/" +
              questionIndex
          ),
          {
            creator: auth.currentUser.uid,
            candidate: auth.currentUser.uid,
            questionId: questionIndex,
            section: questions[questionIndex].section,
            question: questions[questionIndex],
            questionContent: questions[questionIndex].question,
            response: {
              text: textResponse,
              analysis: response.data, // Assuming response.data contains analysis results
            },
            numberOfAttempts: numberOfAttempts,
          }
        );
        setNumberOfAttempts(0);
        setAnswer("");
        setQuestionIndex((prevIndex) => prevIndex + 1);
        if (questionIndex < questions.length - 1) {
          setQuestion(questions[questionIndex + 1]);
          if (question.section == "text") {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            const newTimeoutId = setTimeout(
              uploadTextToFirebase,
              parseInt(question.timeLimit) * 60 * 1000
            );
            setTimeoutId(newTimeoutId);
          }
        } else {
          goBack();
          alert("All questions answered. Submitting recording...");
        }
      } else {
        console.error("No result received from text analysis");
      }
    } catch (error) {
      console.error("Error during text analysis:", error);
    }
  };

  const submitRecording = () => {
    setIsRecording(false);
    axios
      .get("http://127.0.0.1:8080/close_camera")
      .then((response) => {
        // Check if response data contains emotion
        if (response.data) {
          console.log("Predicted emotion:", response.data);
          setNumberOfAttempts(numberOfAttempts + 1);
          setPreviewLink(response.data.video_link);
          setVideoResponse(response.data);
          setPreview(true);
          const db = getDatabase();
          set(
            ref(
              db,
              "completed-interviews/" +
                "/" +
                interviewer +
                "/" +
                paramName +
                "/" +
                auth.currentUser.uid +
                "/" +
                questionIndex
            ),
            {
              creator: auth.currentUser.uid,
              candidate: auth.currentUser.uid,
              questionId: questionIndex,
              question: questions[questionIndex],
              section: questions[questionIndex].section,
              questionContent: questions[questionIndex].question,
              response: response.data,
              numberOfAttempts: numberOfAttempts,
            }
          );
        } else {
          console.error("No emotion data received");
        }
      })
      .catch((error) => {
        console.error("Error stopping recording:", error);
      });

    setQuestionIndex((prevIndex) => prevIndex + 1);
    if (questionIndex < questions.length - 1) {
      setQuestion(questions[questionIndex + 1]);
    } else {
      goBack();
      alert("All questions answered. Submitting recording...");
    }
  };

  const submitRecordingFinal = () => {
    setIsRecording(false);
    setPreviewLink("");
    setPreview(false);
    cancelTimeout();
    setNumberOfAttempts(numberOfAttempts + 1);
    const db = getDatabase();

    set(
      ref(
        db,
        "completed-interviews/" +
          "/" +
          interviewer +
          "/" +
          paramName +
          "/" +
          auth.currentUser.uid +
          "/" +
          questionIndex
      ),
      {
        creator: auth.currentUser.uid,
        candidate: auth.currentUser.uid,
        questionId: questionIndex,
        question: questions[questionIndex],
        section: questions[questionIndex].section,
        questionContent: questions[questionIndex].question,
        response: videoResponse,
        numberOfAttempts: numberOfAttempts,
      }
    );

    setVideoResponse(null);
    setNumberOfAttempts(0);
    setQuestionIndex((prevIndex) => prevIndex + 1);
    if (questionIndex < questions.length - 1) {
      setQuestion(questions[questionIndex + 1]);
      if (question.section == "text") {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(
          uploadTextToFirebase,
          parseInt(question.timeLimit) * 60 * 1000
        );
        setTimeoutId(newTimeoutId);
      }
    } else {
      goBack();
      alert("All questions answered. Submitting recording...");
    }
  };

  const uploadAudioToFirebase = async (blob) => {
    const storageRef = sRef(storage, `audio/${Date.now()}.wav`);
    const uploadTask = await uploadBytesResumable(storageRef, blob);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);

    axios
      .post("http://127.0.0.1:8080/audio_analysis", { link: downloadURL })
      .then((response) => {
        // Check if response data contains emotion
        if (response.data) {
          console.log("Predicted emotion:", response.data);
          setLoading(false);
          setNumberOfAttempts(numberOfAttempts + 1);
          const db = getDatabase();
          set(
            ref(
              db,
              "completed-interviews/" +
                "/" +
                interviewer +
                "/" +
                paramName +
                "/" +
                auth.currentUser.uid +
                "/" +
                questionIndex
            ),
            {
              creator: auth.currentUser.uid,
              candidate: auth.currentUser.uid,
              questionId: questionIndex,
              question: questions[questionIndex],
              section: questions[questionIndex].section,
              questionContent: questions[questionIndex].question,
              response: response.data,
              link: downloadURL,
              numberOfAttempts: numberOfAttempts,
            }
          );
        } else {
          console.error("No result received");
        }
        setNumberOfAttempts(0);
        setQuestionIndex((prevIndex) => prevIndex + 1);

        if (questionIndex < questions.length - 1) {
          setQuestion(questions[questionIndex + 1]);
          if (question.section == "text") {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            const newTimeoutId = setTimeout(
              uploadTextToFirebase,
              parseInt(question.timeLimit) * 60 * 1000
            );
            setTimeoutId(newTimeoutId);
          }
        } else {
          goBack();
          alert("All questions answered. Submitting recording...");
        }
      })
      .catch((error) => {
        console.error("Error stopping recording:", error);
      });
  };

  if (!question) {
    return null; // Render nothing until questions are fetched
  }

  let bannerText = "";
  let buttonText = "";
  if (question.section === "video") {
    bannerText = "Video Question";
    buttonText = "Start Recording";
  } else if (question.section === "audio") {
    bannerText = "Audio Question";
    buttonText = "Start Recording";
  } else if (question.section === "text") {
    bannerText = "Text Question";
    buttonText = "Submit Answer";
  }

  const handleInputChange = (e) => {
    const a = e.target;
    setAnswer(a.value);
  };

  return (
    <>
      <GlobalStyle />
      <Components.ContainerWrapper>
        <Components.Banner>{bannerText}</Components.Banner>
        <Components.BlockQuote>
          <Components.Paragraph class="quotation">
            {question.section === "audio"
              ? question.question
              : `${question.question} (Multiple attempts allowed)`}
          </Components.Paragraph>
        </Components.BlockQuote>

        {question.section === "text" && !preview && (
          <>
            <Timer initialMinutes={parseInt(question.timeLimit)}></Timer>
            <StyledTextInput
              id="textbox_id"
              value={answer}
              onChange={handleInputChange}
              placeholder="Type your answer here..."
            />
          </>
        )}

        {question.section === "text" &&
          (!preview ? (
            <></>
          ) : (
            <>
              <StyledTextInput
                value={previewLink}
                // onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
              />
              <Components.Button
                onClick={() => {
                  reSubmitText(question);
                }}
              >
                Re-attempt
              </Components.Button>
              <Components.Button
                onClick={() => {
                  uploadTextToFirebaseFinal(previewLink);
                }}
              >
                Submit
              </Components.Button>
            </>
          ))}

        {question.section === "audio" &&
          (loading ? (
            <BounceLoader color="#36d7b7" />
          ) : (
            <div>
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                downloadOnSavePress={false}
                downloadFileExtension="wav"
                showVisualizer={true}
              />
            </div>
          ))}

        {question.section === "video" &&
          (!preview && !isRecording ? (
            <img
              src={loader}
              alt=""
              style={{ width: "20%", height: "20%", objectFit: "cover" }}
            />
          ) : preview ? (
            <></>
          ) : (
            <>
              <Timer initialMinutes={parseInt(question.timeLimit)}></Timer>
              <img
                src={apiLink}
                alt=""
                style={{ width: "50%", height: "50%", objectFit: "cover" }}
              />
            </>
          ))}

        {question.section !== "audio" && !preview && !isRecording && (
          <Components.Button onClick={startRecording}>
            {buttonText}
          </Components.Button>
        )}

        {question.section === "audio" && (
          <h4>
            Press the mic button to start recording and save button to submit
            the recording
          </h4>
        )}

        {question.section == "video" && isRecording && (
          <Components.Button onClick={submitRecording}>
            Stop Recording
          </Components.Button>
        )}

        {question.section === "video" &&
          (!preview ? (
            <></>
          ) : (
            <>
              <video controls style={{ width: "500px", height: "300px" }}>
                <source src={previewLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Components.Button onClick={startRecording}>
                Re-attempt
              </Components.Button>
              <Components.Button onClick={submitRecordingFinal}>
                Submit
              </Components.Button>
            </>
          ))}

        {/* <Components.Message>{question.message}</Components.Message> */}
      </Components.ContainerWrapper>
    </>
  );
}

export default VideoInterview;
