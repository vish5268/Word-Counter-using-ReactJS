import { useState, useRef, useEffect } from "react";

const useWordCounter = (startingTime = 10) => {
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(startingTime);
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
    setTimeRemaining(startingTime);
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

  return {
    textBoxRef,
    handleChange,
    text,
    isTimeRunning,
    timeRemaining,
    startGame,
    wordCount
  };
};
export default useWordCounter;
