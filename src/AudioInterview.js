import React, { useState } from "react";
import * as Components from "./AudioComponents.js";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

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

function AudioInterview() {
  const [question, setQuestion] = useState(questions[0]);

  const navigate = useNavigate();

  const goBack = () => navigate("/candidate");

  return (
    <>
      <GlobalStyle />
      <Components.ContainerWrapper>
        <Components.Banner>Audio Interview</Components.Banner>
        <Components.BlockQuote>
          <Components.Paragraph class="quotation">
            {question.title}
          </Components.Paragraph>
        </Components.BlockQuote>
        <Components.Button>Start Recording</Components.Button>
        <Components.Message>{question.message}</Components.Message>
        <Components.Button>Get Emotion Analysis</Components.Button>
        <Components.Anchor href="#">How does it work?</Components.Anchor>
        <Components.BackButton onClick={goBack}>Back</Components.BackButton>
      </Components.ContainerWrapper>
    </>
  );
}

export default AudioInterview;
