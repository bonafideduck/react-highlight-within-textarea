import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

const Code = (props: { code: string | string[] }) => {
  return (
    <SyntaxHighlighter language="javascript">
      {props.code}
    </SyntaxHighlighter>
  );
};

export { Code };
