import React from "react";
import Example from "./Example.js";

const code = `function String() {
  const [value, setValue] = useState("Potato potato tomato potato.");
  return (
    <HighlightWithinTextarea 
      highlight={"potato"}
      value={value}
      onChange={(value) => setValue(value)}
    />
  );
}`;

const Text = () => {
  return (
    <>
      <h2></h2>

      <Example
        title="String"
        text={<span>Note that this is case-insensitive.</span>}
        initialValue="Potato potato tomato potato."
        highlightText={'"potato"'}
        highlight="potato"
        code={code}
        codeSandbox="rhwta-string-cg4y9"
      />
    </>
  );
};

export default Text;
