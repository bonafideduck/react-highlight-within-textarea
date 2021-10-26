import React from "react";
import { Example } from "./Example.js";

const code = `<HighlightWithinTextarea
  highlight={/dogs?|cats?|g(oo|ee)se|land\\s+sharks?/gi}
  ...
/>`;

const Regexp = () => {
  const initialValue = "Dog, cat, chicken, goose. Dogs, cats, chickens, geese. Multiline land\nshark"
  return (
    <Example
      title="RegExp"
      text={
        <span>
          Don't forget the <code>g</code> (find all) and <code>i</code>{" "}
          (case-insensitive) flags if you need them.
        </span>
      }
      initialValue={initialValue}
      highlight={/dogs?|cats?|g(oo|ee)se|land\s+sharks?/gi}
      code={code}
      codeSandbox="rhwta-regexp-5ois8"
    />
  );
};

export { Regexp };
