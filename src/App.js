import React from "react";
import HomePage from "./components/HomePage";
import Question from "./components/Question";
import Background from "./components/Background";
import shuffleArray from "./utils/shuffleArray";

import { nanoid } from "nanoid";

export default function App() {
  const [questions, setQuestions] = React.useState(null);
  const [quizStart, SetQuizStart] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const [countCorrect, setCountCorrect] = React.useState(0);
  const [reset, setReset] = React.useState(false);

  React.useEffect(() => {
    async function fetchTrivia() {
      const request = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await request.json();

      // --data is restuctured--
      // from(data):
      // correct_answer: "Marie";
      // incorrect_answers: (3)[("Cyrus", "Palutena", "Shulk")];
      // console.log("Original Data: ", data);
      const refactoredData = data.results.map((question) => {
        return {
          answers: shuffleArray([
            ...question.incorrect_answers.map((item) => {
              return {
                answer: item,
                isCorrect: false,
                isClicked: false,
                id: nanoid(),
              };
            }),
            {
              answer: question.correct_answer,
              isCorrect: true,
              isClicked: false,
              id: nanoid(),
            },
          ]),
          trivia: question.question,
        };
      });
      //to(refactoredData):
      // 0: {answer: 'Cyrus', isCorrect: false, isClicked:false, id:"random"}
      // 1: {answer: 'Palutena', isCorrect: false, isClicked:false, id:"random"}
      // 2: {answer: 'Shulk', isCorrect: false, isClicked:false, id:"random"}
      // 3: {answer: 'Marie', isCorrect: true, isClicked:false, id:"random"}
      return refactoredData;
    }
    fetchTrivia().then((data) => setQuestions(data));
  }, [reset]);

  const areAllClicked =
    questions !== null
      ? questions.some((question) => {
          return question.answers.every((answer) => !answer.isClicked);
        })
      : "kurac";

  function handleClickAnswer(id, e) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        return {
          answers: question.answers.map((awr) => {
            return awr.id === id
              ? {
                  answer: awr.answer,
                  id: awr.id,
                  isClicked: !awr.isClicked,
                  isCorrect: awr.isCorrect,
                  disabled: awr.isClicked,
                }
              : {
                  answer: awr.answer,
                  id: awr.id,
                  isClicked: awr.isClicked,
                  isCorrect: awr.isCorrect,
                  disabled: !awr.isClicked,
                };
          }),
          trivia: question.trivia,
        };
      })
    );
  }
  function countCorrectAnswer(isCorrect, e) {
    setCountCorrect((prevCount) => (isCorrect ? prevCount + 1 : prevCount));
  }
  console.log(questions === null);
  return (
    <main className="container center-flex">
      <Background />

      {!quizStart ? (
        <HomePage
          disabled={questions === null}
          handleClick={() => SetQuizStart((prevState) => !prevState)}
        />
      ) : (
        <div className="questions-container">
          {questions.map((question) => {
            return (
              <Question
                key={nanoid()}
                handleClickAnswer={handleClickAnswer}
                trivia={question.trivia}
                answers={question.answers}
                showResult={showResult}
                countCorrectAnswer={countCorrectAnswer}
              />
            );
          })}

          <button
            disabled={areAllClicked}
            onClick={() => setShowResult((prevState) => !prevState)}
            className={
              !showResult ? "check-answer-btn" : "check-answer-btn-hidden"
            }
          >
            Check answers
          </button>

          <div className={!showResult ? "finished-hidden" : "finished-shown"}>
            <p className="count-correct">
              You scored {countCorrect}/5 correct answers
            </p>
            <button
              onClick={() => {
                setReset((prevState) => !prevState);
                setShowResult((prevState) => !prevState);
                setCountCorrect(0);
              }}
              className="check-answer-btn"
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
