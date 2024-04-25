import {
  Button,
  Card,
  Container,
  Nav,
  Navbar,
  Modal,
  Form,
} from "react-bootstrap";
import logo from "./assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavigationBar.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { child, get, getDatabase, push, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom"; // Import custom CSS file
import "./interviewer_css.css";
import RectangleWithText from "./RectangleWithText";
import { BounceLoader } from "react-spinners";
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

export default function InterviewerScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [interviews, setInterviews] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningQuiz, setAssigningQuiz] = useState(null);
  const [selectedinterviews, selectedsetInterviews] = useState([]);
  const [selectedselectedQuiz, selectedsetSelectedQuiz] = useState(null);
  const [filtered, setFilteredInterviews] = useState([]);
  const [interviewDetails, setInterviewDetails] = useState();
  const [names, setNames] = useState({});
  const [InterviewIds, setInterviewIds] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInterviewDetails, setSelectedInterviewDetails] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  const styles = {
    loaderContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh", // Ensure it takes the full height of the viewport
    },
  };

  const handleDetails = (interview) => {
    console.log(interview);
    setSelectedInterviewDetails(interview);
    setShowDetailsModal(true);
  };

  const getName = async (userId) => {
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      const username = snapshot.val().username;
      setNames((prevNames) => ({
        ...prevNames,
        [userId]: username,
      }));
      console.log("here");
      setLoading(false);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(getDatabase());
      try {
        // Fetch interviews
        const interviewsSnapshot = await get(child(dbRef, "interviews"));
        const interviewsData = [];
        interviewsSnapshot.forEach((childSnapshot) => {
          const intv = childSnapshot.val();
          if (intv.creator === auth.currentUser.uid) {
            interviewsData.push({
              id: childSnapshot.key,
              ...intv,
            });
          }
        });

        setInterviews(interviewsData);
        console.log(`interviewsData: ${interviewsData}`);

        // Fetch completed interviews
        const completedInterviewsSnapshot = await get(
          child(dbRef, `completed-interviews/${auth.currentUser.uid}`)
        );
        const completedInterviewsData = [];
        completedInterviewsSnapshot.forEach((childSnapshot) => {
          const intv = childSnapshot.val();
          const key = childSnapshot.key;
          completedInterviewsData.push({
            id: key,
            ...intv,
          });
        });

        selectedsetInterviews(completedInterviewsData);
        console.log(
          `selectedinterviews.length: ${completedInterviewsData.length}`
        );

        // Fetch user data
        const userDataSnapshot = await get(
          child(dbRef, `users/${auth.currentUser.uid}`)
        );
        if (userDataSnapshot.exists()) {
          const userData = userDataSnapshot.val();
          console.log(userData.companyName);
          setName(userData.username);
        } else {
          console.log("No user data available");
        }

        // Fetch filtered interviews
        const filteredInterviews = [];
        for (let i = 0; i < completedInterviewsData.length; i++) {
          const interviewSnapshot = await get(
            child(
              dbRef,
              `completed-interviews/${auth.currentUser.uid}/${completedInterviewsData[i].id}`
            )
          );
          if (interviewSnapshot.exists()) {
            const interviewData = [];
            interviewSnapshot.forEach((childSnapshot) => {
              const intv = childSnapshot.val();
              interviewData.push({
                id: childSnapshot.key,
                ...intv,
              });
              setInterviewIds((prevNames) => ({
                ...prevNames,
                [childSnapshot.key]: completedInterviewsData[i].id,
              }));
            });
            filteredInterviews.push(...interviewData);
            console.log(`Filtered interview length: ${interviewData.length}`);
          }
        }
        setFilteredInterviews(filteredInterviews);

        // Fetch names
        filteredInterviews.forEach(async (interview) => {
          if (!names[interview.id]) {
            await getName(interview.id);
          }
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, []);

  // useEffect(() => {
  //     const filtered = selectedinterviews.filter(interview => interview.creator === auth.currentauth.currentUser.uid);
  //     setFilteredInterviews(filtered);
  //     console.log(filtered.length);
  // }, [interviews, auth.currentauth.currentUser.uid]);
  const handleCardClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };
  // async function getName(userid) {
  //     const dbRef = ref(getDatabase());
  //     let name2='';
  //     await get(child(dbRef, `users/${userid}`)).then((snapshot) => {
  //         if (snapshot.exists()) {
  //             console.log(snapshot.val());
  //             console.log(snapshot.val().companyName)
  //             name2 = snapshot.val().username;
  //         } else {
  //             console.log("No data available");
  //         }
  //     }).catch((error) => {
  //         console.error(error);
  //     });
  //     return name2;
  // }
  // const getName = async (userId) => {
  //     const dbRef = ref(getDatabase());
  //     const snapshot = await get(child(dbRef, `users/${userId}`));
  //     console.log(snapshot.val().username);
  //     return snapshot.exists() ? snapshot.val().username : "No data available";
  // };
  const handleNavigate = (e) => {
    navigate("create_quiz");
  };
  const handleNavigateSignOut = (e) => {
    auth
      .signOut()
      .then(function () {
        navigate("/");
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const handleCardClick2 = (quiz) => {
    console.log(quiz);
    navigate("interviewReport", { state: { paramName: quiz } });
  };
  const handleCardClick5 = (quiz) => {
    setSelectedQuiz(quiz);
    setShowAssignModal(true);
    setAssigningQuiz(quiz);
  };

  const handleAssign = (quizId) => {
    // Logic to assign the quiz
    console.log(`Quiz with ID ${selectedQuiz.id} assigned`);
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    push(ref(db, "assignedQuizzes/"), {
      email: email,
      creator: auth.currentUser.uid,
      quiz: selectedQuiz,
      quizId: selectedQuiz.id,
    });
    alert(`Quiz assigned to :${email}`);
    setShowModal(false);
    setEmail("");
  };
  return loading ? (
    <div style={styles.loaderContainer}>
      <BounceLoader color="#36d7b7" />
    </div>
  ) : (
    <>
      <Navbar className="custom-navbar" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="brand-name">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
            {name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button
                className="custom-button"
                variant="outline-light"
                onClick={handleNavigate}
              >
                Create Interview
              </Button>
              <Button
                className="custom-button"
                variant="outline-light"
                onClick={handleNavigateSignOut}
              >
                Sign Out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <h2>Created Interviews</h2>
        <div className="d-flex flex-wrap">
          {interviews.map((interview) => (
            <Card key={interview.id} className="m-2" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{interview.name}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => handleCardClick(interview)}
                >
                  ViewDetails
                </Button>
                <Button
                  style={{ marginLeft: "20px" }}
                  variant="success"
                  onClick={() => handleCardClick5(interview)}
                  className="ml-2"
                >
                  Assign
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
      <Container className="mt-5">
        <h2>Completed Interviews</h2>
        <div className="d-flex flex-wrap">
          {filtered.map((interview) => (
            <Card
              key={interview.key}
              className="m-2"
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Card.Title>{names[interview.id]}</Card.Title>
                {/*<Card.Body>*/}
                {/*    <div>{names[interview.id]}</div>*/}
                {/*</Card.Body>*/}
                <Button
                  variant="primary"
                  onClick={() => handleDetails(interview)}
                >
                  View Details
                </Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  variant="success"
                  onClick={() =>
                    handleCardClick2(
                      auth.currentUser.uid +
                        "/" +
                        InterviewIds[interview.id] +
                        "/" +
                        interview.id
                    )
                  }
                  className="ml-2"
                >
                  View Report
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedQuiz?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Questions:</h5>
          <ul>
            {selectedQuiz?.questions.map((question, index) => (
              <li key={index}>
                {question.question} - {question.section}
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
      {/* Modal to enter email address */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAssign}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Interview Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInterviewDetails &&
            Object.values(selectedInterviewDetails).map((que, index) =>
              index + 1 !== Object.values(selectedInterviewDetails).length ? (
                <div key={index}>
                  <br></br>
                  <h5>{`Question ${index + 1} : ${que.questionContent}`}</h5>

                  {/* <p>{`Type: ${que.section}`}</p> */}
                  {/* word.charAt(0).toUpperCase() + word.slice(1); */}
                  <RectangleWithText borderColor="#000000" text={que.section} />
                  <br></br>
                  {que.section === "video" && (
                    <>
                      <video
                        controls
                        style={{ width: "500px", height: "300px" }}
                      >
                        <source
                          src={que.response.video_link}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      {/* <p>{`Video Link: ${que.response.video_link}`}</p> */}
                    </>
                  )}
                  {que.section === "audio" && (
                    <>
                      {/* <p>{`Audio Link: ${que.link}`}</p> */}
                      <audio controls>
                        <source src={que.link} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      {/* Render other response data for audio section */}
                    </>
                  )}
                  {que.section === "text" && (
                    <>
                      <p>{`Response: ${que.response.text}`}</p>
                      {/* Render other response data for text section */}
                    </>
                  )}
                  {/* Add styling or structure as needed */}
                </div>
              ) : (
                <></>
              )
            )}
        </Modal.Body>
        {/* Additional modal footer or actions if needed */}
      </Modal>
    </>
  );
}
