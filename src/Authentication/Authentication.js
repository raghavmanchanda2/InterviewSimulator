import React, { useEffect, useState } from "react";
import * as Components from "./Component";
import styled, { createGlobalStyle } from "styled-components";
import signUpImg from "./assets/signUp.png";
import signInImg from "./assets/signIn.png"; // Import Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const EyeIcon = ({ visible, toggleVisibility }) => {
  return (
    <IconWrapper onClick={toggleVisibility}>
      {visible ? (
        <i className="fa fa-eye-slash"></i>
      ) : (
        <i className="fa fa-eye"></i>
      )}
    </IconWrapper>
  );
};

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #aaa;
`;

export function Authentication() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [companyName, setCompanyName] = useState("candidate"); // State to manage company name
  const [email, setEmail] = useState("");
  const [name, setName] = useState("username");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSignUp = () => {
    // Check if password and confirm password match
    setPasswordMatch(confirmPassword === password);
  };
  const [signIn, toggle] = React.useState(true);
  const [userType, setUserType] = useState("candidate"); // Default to interviewer
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSignUps = async (e) => {
    e.preventDefault();
    // Your sign up logic with Firebase
    if (userType === "interviewer" && companyName === "candidate")
      alert("please select company name");
    else {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user.email);
            if (userType === "candidate") {
              const db = getDatabase();
              set(ref(db, "users/" + auth.currentUser.uid), {
                username: name,
                email: email,
                userType: userType,
                companyName: "candidate",
              });
            } else {
              if (companyName === "candidate") {
                alert("Please enter company name");
              } else {
                const db = getDatabase();
                set(ref(db, "users/" + auth.currentUser.uid), {
                  username: name,
                  email: email,
                  userType: userType,
                  companyName: companyName,
                });
              }
            }
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            // ..
          });
      } else {
        alert("Password doesn't match");
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Your sign in logic with Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${auth.currentUser.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              console.log(snapshot.val().companyName);
              if (snapshot.val().userType === "interviewer") {
                navigate("interviewer");
              } else {
                navigate("candidate");
              }
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  useEffect(() => {
    // Set the default user type to "candidate" when the component mounts
    setUserType("candidate");
    const user = auth.currentUser;

    if (user != null) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${auth.currentUser.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            console.log(snapshot.val().companyName);
            if (snapshot.val().userType === "interviewer") {
              navigate("interviewer");
            } else {
              navigate("candidate");
            }
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <Components.ContainerWrapper>
        <Components.Container>
          <Components.SignUpContainer signinIn={signIn}>
            <Components.Form>
              <Components.Title>Create Account</Components.Title>
              <Components.FormGroup>
                <Components.Label htmlFor="name">Name</Components.Label>
                <Components.Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  onChange={handleNameChange}
                />
              </Components.FormGroup>
              <Components.FormGroup>
                <Components.Label htmlFor="email">
                  Email Address
                </Components.Label>
                <Components.Input
                  type="email"
                  id="email"
                  autoComplete={"off"}
                  placeholder="Eg. developer.0208@gmail.cp,"
                  onChange={handleEmailChange}
                />
              </Components.FormGroup>
              <Components.FormGroup>
                <Components.Label htmlFor="password">Password</Components.Label>
                <Components.Input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  id="password"
                  placeholder="Enter Your Password"
                  onChange={handlePasswordChange}
                />
                <EyeIcon
                  visible={showPassword}
                  toggleVisibility={togglePasswordVisibility}
                />
              </Components.FormGroup>
              <Components.FormGroup>
                <Components.Label htmlFor="confirm-password">
                  Confirm Password
                </Components.Label>
                <Components.Input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                />
                {!passwordMatch && (
                  <ErrorMessage>Passwords do not match</ErrorMessage>
                )}
              </Components.FormGroup>
              <Components.FormGroup>
                <Components.Label>User Type:</Components.Label>
                <Components.RadioContainer>
                  <Components.RadioInput
                    type="radio"
                    id="interviewer"
                    name="userType"
                    checked={userType === "interviewer"}
                    value="interviewer"
                    onChange={handleUserTypeChange}
                  />
                  <Components.RadioLabel htmlFor="interviewer">
                    Interviewer
                  </Components.RadioLabel>
                  <Components.RadioInput
                    type="radio"
                    id="candidate"
                    name="userType"
                    value="candidate"
                    checked={userType === "candidate"}
                    onChange={handleUserTypeChange}
                  />
                  <Components.RadioLabel htmlFor="candidate">
                    Candidate
                  </Components.RadioLabel>
                </Components.RadioContainer>
                {userType === "interviewer" && ( // Render text field conditionally
                  <Components.FormGroup>
                    <Components.Label htmlFor="companyName">
                      Company Name
                    </Components.Label>
                    <Components.Input
                      type="text"
                      id="companyName"
                      value={companyName}
                      onChange={handleCompanyNameChange}
                      placeholder="Enter Company Name"
                    />
                  </Components.FormGroup>
                )}
              </Components.FormGroup>
              <Components.Button onClick={handleSignUps}>
                Sign Up
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            <Components.Form>
              <Components.Title>Sign in</Components.Title>
              <Components.FormGroup>
                <Components.Label htmlFor="signin-email">
                  Email
                </Components.Label>
                <Components.Input
                  type="email"
                  id="signin-email"
                  placeholder="Email"
                  onChange={handleEmailChange}
                />
              </Components.FormGroup>
              <Components.FormGroup>
                <Components.Label htmlFor="signin-password">
                  Password
                </Components.Label>
                <Components.Input
                  type="password"
                  id="signin-password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </Components.FormGroup>
              <Components.Anchor href="#">
                Forgot your password?
              </Components.Anchor>
              <Components.Button onClick={handleSignIn}>
                Sigin In
              </Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Image src={signInImg} alt="Welcome Image" />
                <Components.Title2>Welcome Back!</Components.Title2>
                <Components.Paragraph>
                  To keep connected with us, please login with your personal
                  information. Your journey towards interview success continues
                  here.
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>
              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Image src={signUpImg} alt="Welcome Image" />

                <Components.Title2>New Here !</Components.Title2>

                <Components.Paragraph>
                  Enter your details and start your journey towards interview
                  success with us. Let's take the first step together.
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </Components.ContainerWrapper>
    </>
  );
}
