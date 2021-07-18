import React from "react";
import Example from "./Example.js";

const code = `<HighlightWithinTextarea
  highlight={[6, 23]}
  ...
/>`;

const Range = () => {
  return (
    <>
      <Example
        title="Array of Two Numbers (Range)"
        text="An array of exactly two numbers is treated as a range. Highlighting starts at the first character index (inclusive) and ends at the second character index (exclusive).  Ranges can also span multiple lines with the line break character (or characters for Windows) being included"
        initialValue="apple watermelon banana orange mango"
        code={code}
        highlight={[6, 23]}
        codeSandbox="rhwta-range-l85l2"
      />
    </>
  );
};

export default Range;
