import React from "react";

export default function HomePage(props) {
  // console.log(props);
  return (
    <div className="home-page">
      <h1>Quizzical</h1>
      <p>Very unordinaly trivia quiz</p>
      <button onClick={props.handleClick}>Start quiz</button>
    </div>
  );
}
