import React, { useEffect, useState, useRef } from "react";
import "./styles.css";

const App = () => {
  const STARTING_TIME = 15;

  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const textBoxRef = useRef(null);

  // Detecting the change in the target value of the textarea
  const handleChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  // Defining a function to determine the word count within the textarea
  const counter = (text) => {
    const wordCount = text.trim().split(" ");
    return wordCount.filter((word) => word !== "").length;
  };

  // Resetting the counter everytime the start button is clicked to avoid re-run
  const startGame = () => {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText("");
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  };

  const endGame = () => {
    setIsTimeRunning(false);
    const numWords = counter(text);
    setWordCount(numWords);
  };

  // Decreasing the timeRemaining to establish a count-down
  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <>
      <h1>How fast do you type ?</h1>
      <textarea
        ref={textBoxRef}
        value={text}
        onChange={handleChange}
        disabled={!isTimeRunning}
      />
      <h4>Time Remaining: {timeRemaining} </h4>
      <button onClick={startGame} disabled={isTimeRunning}>
        START
      </button>
      <h1>Word count:{wordCount}</h1>
    </>
  );
};

export default App;
