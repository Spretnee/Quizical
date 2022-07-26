import React from "react";
import Answer from "./Answer";

export default function Question(props) {
  // console.log("Props from Question component", props);

  const isAlreadyClicked = props.answers.every((answer) => !answer.isClicked); // checks if at least one answer is clicked//
  // console.log(isAlreadyClicked);

  const answersElement = props.answers.map((item, index) => {
    return (
      <Answer
        handleClick={(e, id) => props.handleClickAnswer(e, id)}
        isClicked={item.isClicked}
        isCorrect={item.isCorrect}
        key={index}
        text={item.answer}
        id={item.id}
        disabled={!isAlreadyClicked && item.disabled}
        showResult={props.showResult}
        countCorrectAnswer={(e, isCorrect) =>
          props.countCorrectAnswer(e, isCorrect)
        }
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
