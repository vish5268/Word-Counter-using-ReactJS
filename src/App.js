import React from "react";
import "./styles.css";
import useWordCounter from "../hooks/useWordCounter";

const App = () => {
  const {
    textBoxRef,
    handleChange,
    text,
    isTimeRunning,
    timeRemaining,
    startGame,
    wordCount
  } = useWordCounter();

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
