import React from "react";
import Example from "./Example.js";

const Text = () => {
  return (
    <>
      <h2>String</h2>
      <span>Note that this is case-insensitive.</span>

      <Example
        initialValue="Potato potato tomato potato."
        highlightText={'"potato"'}
        highlight="potato"
      />
    </>
  );
};

export default Text;
