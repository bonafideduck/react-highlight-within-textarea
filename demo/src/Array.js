import React from "react";
import Example from "./Example.js";

const code = `<HighlightWithinTextarea
  highlight={[
    'orange',
    /ba(na)*/gi,
    [0, 5]
  ]}
  ...
/>`;

const Array = () => {
  return (
    <>
      <Example
        title="Array of Other Things"
        text="You can highlight multiple things, using any types mentioned here, with an array."
        initialValue="apple watermelon banana orange mango"
        code={code}
        highlight={["orange", /ba(na)*/gi, [0, 5]]}
        codeSandbox="rhwta-regexp-5ois8"
      />
    </>
  );
};

export default Array;
