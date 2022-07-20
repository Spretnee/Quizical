import React from "react";

export default function Answer(props) {
  // console.log(`Props from Answer component`, props);
  const hiddenResultsStyle = props.isCorrect
    ? "answer correct-answer "
    : props.isClicked && !props.isCorrect
    ? "answer clicked-wrong-answer"
    : "answer";
  const clickedAnswersStyle = props.isClicked ? "answer clicked" : "answer";
  const displayResults = props.showResult
    ? hiddenResultsStyle
    : clickedAnswersStyle;
  return (
    <button
      disabled={props.disabled}
      onClick={(e) => {
        props.handleClick(props.id, e);
      }}
      className={displayResults}
    >
      {props.text}
    </button>
  );
}
