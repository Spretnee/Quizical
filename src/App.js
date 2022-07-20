import React from "react";
import HomePage from "./components/HomePage";
import Question from "./components/Question";
import Background from "./components/Background";
import shuffleArray from "./utils/shuffleArray";
import { nanoid } from "nanoid";

export default function App() {
  const [questions, setQuestions] = React.useState(null);
  const [quizStart, SetQuizStart] = React.useState(false);

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
  }, []);

  // function handleClickAnswer(e, id) {
  //   setQuestions((prevQuestions) =>
  //     prevQuestions.map((question, index) =>
  //       question.answers[index].isClicked === isClicked
  //         ? {
  //             ...question,
  //             answers: [...question.answers[index].answer, (isClicked = !isClicked)],
  //           }
  //         : question
  //     )
  //   );
  //   console.log("koji kurac", questions);
  // }

  function handleClickAnswer(e, id) {
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
                }
              : awr;
          }),
          trivia: question.trivia,
        };
      })
    );
  }

  console.log(questions);
  return (
    <main className="container center-flex">
      <Background />

      {!quizStart ? (
        <HomePage handleClick={() => SetQuizStart((prevState) => !prevState)} />
      ) : (
        <div className="questions-container">
          <Question
            handleClickAnswer={handleClickAnswer}
            trivia={questions[0].trivia}
            answers={questions[0].answers}
          />

          <button className="check-answer-btn">Check answers</button>
        </div>
      )}
    </main>
  );
}
