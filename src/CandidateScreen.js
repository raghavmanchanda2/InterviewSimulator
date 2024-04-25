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

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(getDatabase());
      await get(child(dbRef, "assignedQuizzes")).then(async (snapshot) => {
        if (snapshot.exists()) {
          const interviewsData = [];
          snapshot.forEach((childSnapshot) => {
            const intv = childSnapshot.val();
            console.log(auth.currentUser.email);
            if (intv.email === auth.currentUser.email) {
              interviewsData.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
              });
            }
          });
          setInterviews(interviewsData);
        }
      });

      // Fetch user data
      await get(child(dbRef, `users/${auth.currentUser.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            console.log(snapshot.val().companyName);
            setName(snapshot.val().username);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
  }, []);
  const handleCardClick = (quiz) => {
    setSelectedQuiz(quiz);
    setShowModal(true);
  };
  const handleNavigate = (e) => {
    navigate("mock");
  };
  const handleNavigate2 = (e) => {
    navigate("mockre");
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
    setSelectedQuiz(quiz);
    console.log(quiz.id);
    navigate("interview", { state: { paramName: quiz.id } });
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
  return (
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
                Mock Interview
              </Button>
              <Button
                className="custom-button"
                variant="outline-light"
                onClick={handleNavigate2}
              >
                Mock Analysis
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
        <h2>Pending Interviews</h2>
        <div className="d-flex flex-wrap">
          {interviews.map((interview) => (
            <Card key={interview.id} className="m-2" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{interview.quiz.name}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => handleCardClick(interview.quiz)}
                >
                  View Details
                </Button>
                <Button
                  style={{ marginLeft: "20px" }}
                  variant="success"
                  onClick={() => handleCardClick2(interview.quiz)}
                  className="ml-2"
                >
                  Attempt
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
    </>
  );
}
