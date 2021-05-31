import React from "react";
import Example from "./Example.js";

const Regexp = () => {
  return (
    <>
      <h2>RegExp</h2>
      <span>
        Don't forget the <code>g</code> (find all) and <code>i</code>{" "}
        (case-insensitive) flags if you need them.
      </span>
      <Example
        initialValue="Dog, cat, chicken, goose. Dogs, cats, chickens, geese."
        highlightText={`/dogs?|cats?|g(oo|ee)se/gi`}
        highlight={/dogs?|cats?|g(oo|ee)se/gi}
      ></Example>
    </>
  );
};

export default Regexp;
