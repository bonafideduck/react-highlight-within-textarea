import React from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HighlightWithinTextarea } from "../../src";
import { Code } from "./Code";
import { CodeSandbox } from "./CodeSandbox";

const Example = ({
  title,
  text,
  initialValue,
  highlight,
  code,
  codeSandbox,
  onChange,
  onEveryChange,
  selection,
}) => {
  const [value, setValue] = useState(initialValue);
  const onChange2 = onChange
    ? (value, selection) => {
        setValue(onChange(value, selection));
      }
    : setValue;
  const onEveryChange2 = onEveryChange
    ? (value, selection, editorState) =>
        setValue(onEveryChange(value, selection, editorState))
    : undefined;
  code = code || "undefined";
  let style = {
    marginTop: 8,
    marginBottom: 8,
    border: "solid 1pt black",
    height: "60px",
    overflow: "scroll",
  };

  return (
    <Row>
      <Col>
        <h2>{title}</h2>
        {text}
        <div style={style}>
          <HighlightWithinTextarea
            value={value}
            highlight={highlight}
            onChange={onChange2}
            onEveryChange={onEveryChange2}
            selection={selection}
          />
        </div>
        <div style={{ position: "relative" }}>
          <Code code={code} />
          <CodeSandbox
            style={{ position: "absolute", bottom: 8, right: 8 }}
            codeSandbox={codeSandbox}
          />
        </div>
        <hr />
      </Col>
    </Row>
  );
};

export { Example };
