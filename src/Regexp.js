import React from "react";
import Example from "./Example.js";

const Paragraph = () => {
  return (
    <span>
      Don't forget the <code>g</code> (find all) and <code>i</code>{" "}
      (case-insensitive) flags if you need them.
    </span>
  );
};

const Regexp = () => {
  return (
    <>
      <Example
        title="RegExp"
        text={<Paragraph />}
        initialValue="Dog, cat, chicken, goose. Dogs, cats, chickens, geese."
        highlightText={`/dogs?|cats?|g(oo|ee)se/gi`}
        highlight={/dogs?|cats?|g(oo|ee)se/gi}
      />
    </>
  );
};

export default Regexp;
