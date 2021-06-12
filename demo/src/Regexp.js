import React from "react";
import Example from "./Example.js";

const code = `<HighlightWithinTextarea
  highlight={/dogs?|cats?|g(oo|ee)se/gi}
  ...
/>`;

const Regexp = () => {
  return (
    <Example
      title="RegExp"
      text={
        <span>
          Don't forget the <code>g</code> (find all) and <code>i</code>{" "}
          (case-insensitive) flags if you need them.
        </span>
      }
      initialValue="Dog, cat, chicken, goose. Dogs, cats, chickens, geese."
      highlight={/dogs?|cats?|g(oo|ee)se/gi}
      code={code}
      codeSandbox="rhwta-regexp-5ois8"
    />
  );
};

export default Regexp;
