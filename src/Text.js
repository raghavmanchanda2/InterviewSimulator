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
      "After pressing the button above, you will have 1 min to answer the question.",
  },
  {
    title: "Tell me about yourself.",
    message:
      "After pressing the button above, you will have 1min to answer the question.",
  },
];

function Text() {

  const [answer, setAnswer] = useState(""); // State to store the typed paragraph
  const [question, setQuestion] = useState(questions[0]);

  const navigate = useNavigate();

  const goBack = () => navigate("/candidate/text-interview");

  const handleInputChange = (event) => {
    setAnswer(event.target.value); // Update the answer state as the user types
  };

  return (
    <>
      <GlobalStyle />
      <Components.ContainerWrapper>
        <Components.Banner>Write Text</Components.Banner>
        <Components.BlockQuote>
          <Components.Paragraph class="quotation">
            {question.title}
          </Components.Paragraph>
        </Components.BlockQuote>
        <textarea
          value={answer}
          onChange={handleInputChange}
          placeholder="Type your answer here..."
          rows={10} 
          cols={100} 
        />
        <Components.Button>Submit</Components.Button>
        <Components.BackButton onClick={goBack}>Back</Components.BackButton>
      </Components.ContainerWrapper>
    </>
  );
}

export default Text;
