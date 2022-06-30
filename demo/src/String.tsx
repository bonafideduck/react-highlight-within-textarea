import React from "react";
import { Example } from "./Example";

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

const String = () => {
  return (
    <>
      <Example
        title="String"
        text={<span>Note that this is case-insensitive.</span>}
        initialValue="Potato potato tomato potato."
        highlight="potato"
        code={code}
        codeSandbox="rhwta-string-cg4y9"
      />
    </>
  );
};

export { String };
