import React from "react";
import { Example } from "./Example";

const code = `function UpperCaseHateTomatoes() {
  const [value, setValue] = useState("POTATO TOMAT <- add an O here");

  return (
    <HighlightWithinTextarea 
      highlight={"TOMAT"}
      value={value}
      onChange={(value) =>
        setValue(value.toUpperCase().replaceAll("TOMATO", "ONION"))
      }
    />
  );
}`;

const ChangeValue = () => {
  return (
    <>
      <Example
        title="Dynamically Changing Value"
        text={
          <span>
            You can change the value at any time in your OnChange() handling.
            Note that if the value is changed, this library uses a simple
            algorighm to calculate the cursor position which is to shift the{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Selection#glossary">
              anchor and focus
            </a>{" "}
            from its last position by the length that the value text changed.
            This technique mostly works, but this fails for complex changes. For
            example, if typing a <code>(</code>added a matching <code>)</code>,
            the cursor would move to after the <code>)</code> even if the desire
            was to allow text within the <code>()</code>.
          </span>
        }
        initialValue="POTATO TOMAT <- ADD AN O HERE"
        highlight="TOMAT"
        onChange={(value) => {
          return value.toUpperCase().replaceAll("TOMATO", "ONION");
        }}
        code={code}
        codeSandbox="rhwta-dynamic-change-t869w"
      />
    </>
  );
};

export { ChangeValue };
