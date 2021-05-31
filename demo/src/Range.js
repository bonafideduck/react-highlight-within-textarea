import React from "react";
import Example from "./Example.js";

const Range = () => {
  return (
    <>
      <h2>Range</h2>
      <span>Array of Two Numbers (Range)</span>

      <Example
        initialValue="Potato potato tomato potato."
        highlightText={"[2, 6]]"}
        highlight={[2, 6]}
      />
    </>
  );
};

export default Range;
