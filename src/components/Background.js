import React from "react";

export default function Background() {
  return (
    <>
      <img
        className="lower-left-blob"
        src={require("../images/blob-lower-left.png")}
        alt="lowerleftblob"
      />
      <img
        className="upper-right-blob"
        src={require("../images/blobs-upper-left.png")}
        alt="upperrightblob"
      />
    </>
  );
}
