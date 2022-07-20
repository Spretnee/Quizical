import React from "react";

export default function Answer(props) {
  console.log("Props from Answer component", props);

  return (
    <button
      disabled={props.disabled}
      onClick={(e) => {
        props.handleClick(props.id, e);
      }}
      className={!props.isClicked ? "answer" : "answer clicked"}
    >
      {props.text}
    </button>
  );
}
