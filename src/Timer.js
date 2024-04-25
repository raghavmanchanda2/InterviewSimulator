import React, { useState, useEffect } from "react";

const Timer = ({ initialMinutes }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialMinutes]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="flex items-center justify-center h-24 w-24 relative">
      <div className="absolute h-full w-full flex items-center justify-center">
        <svg className="h-20 w-20">
          <circle
            cx="50%"
            cy="50%"
            r="15%"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
          ></circle>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-lg font-bold text-gray-800"
          >
            {formattedTime}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Timer;
