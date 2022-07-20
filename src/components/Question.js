import React from "react";
import Answer from "./Answer";

export default function Question(props) {
  //   console.log("Props from Question component", props);
  const answersElement = props.answers.map((item, index) => {
    return (
      <Answer
        handleClick={(e, isClicked) => props.handleClickAnswer(e, isClicked)}
        isClicked={item.isClicked}
        isCorrect={item.isCorrect}
        key={index}
        text={item.answer}
      />
    );
  });

  return (
    <div className="question">
      <h2>{props.trivia}</h2>
      <div className="answers">{answersElement}</div>
    </div>
  );
}
