import React, { useState, useRef } from "react";
import * as Components from "./AudioComponents.js";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import Loader from './SampleVideo.mp4';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const questions = [
  {
    title: "Tell us about the last time you showed leadership.",
    message:
      "After pressing the button above, you will have 15sec to answer the question.",
  },
  {
    title: "Tell me about yourself.",
    message:
      "After pressing the button above, you will have 1min to answer the question.",
  },
];

function VideoInterview() {
  const [question, setQuestion] = useState(questions[1]);
  const [isPlaying, setIsPlaying] = useState(true); // State to manage play/pause
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const goBack = () => navigate("/candidate");

  const togglePlay = () => {
    setIsPlaying(prevState => !prevState);
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
  };

  return (
    <>
      <GlobalStyle />
      <Components.ContainerWrapper>
        <Components.Banner>Video Interview</Components.Banner>
        <Components.BlockQuote>
          <Components.Paragraph className="quotation">
            {question.title}
          </Components.Paragraph>
          </Components.BlockQuote>
          <Components.Button>Start Recording</Components.Button>
        

        <div className="w-full h-screen relative">
          <video
              src={Loader} type="video/mp4"
              controls
              width="50%"
              height="50%"
              muted="false"
              autoPlay="true"
              loop
            className="w-full h-full object-cover"
          >
            <source src={Loader} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
        </div>
        <Components.Anchor href="#">How does it work?</Components.Anchor>
        <Components.BackButton onClick={goBack}>Back</Components.BackButton>
      </Components.ContainerWrapper>
    </>
  );
}

export default VideoInterview;
