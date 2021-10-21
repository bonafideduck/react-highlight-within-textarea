import React from "react";
import Example from "./Example.js";

const code = `function UpperCaseHateTomatoes() {
  const [value, setValue] = useState("POTATO TOMAT <- add an O here");

  return (
    <HighlightWithinTextarea 
      highlight={"potato"}
      value={value}
      onChange={(value) =>
        setValue(value.toUpperCase().replaceAll("TOMATO", "POTATO"))
      }
    />
  );
}`;

const OnDraftJSChange = () => {
  return (
    <>
      <h2></h2>

      <Example
        title="Dynamically Changing Value"
        text={
          <span>
            You can change the value at any time in your OnChange() handling.
          </span>
        }
        initialValue="POTATO TOMAT <- ADD AN O HERE"
        highlight="TOMAT"
        onChange={(value) => value.toUpperCase().replaceAll("TOMATO", "POTATO") }
        code={code}
        codeSandbox="rhwta-string-cg4y99"
      />
    </>
  );
};

export default OnDraftJSChange;
