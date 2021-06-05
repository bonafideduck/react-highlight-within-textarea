import React from "react";
import Example from "./Example.js";

const Range = () => {
  return (
    <>
      <Example
        title="Range"
        text="Array of two numbers (Range)"
        initialValue="Potato potato tomato potato."
        code={`highlight={[2, 6]]}`}
        highlight={[2, 6]}
      />
    </>
  );
};

export default Range;
