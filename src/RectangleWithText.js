import React from "react";

const RectangleWithText = ({ borderColor, text }) => {
  return (
    <div
      style={{
        width: "70px", // Adjust width as needed
        height: "30px", // Adjust height as needed
        border: `2px solid ${borderColor}`, // Border color
        borderRadius: "5px", // Adjust border radius as needed
        padding: "10px",
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    >
      {text}
    </div>
  );
};

export default RectangleWithText;
