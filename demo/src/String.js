import React from "react";
import Example from "./Example.js";

const code = `function Demo() {
  const [value, setValue] = useState("Potato potato tomato potato.");
  return (
    <HighlightWithinTextarea 
      value={value}
      onChange={(value) => setValue(value)}
      highlight={"potato"}
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
      />
    </>
  );
};

export default Text;
