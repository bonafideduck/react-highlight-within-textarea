import React from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HighlightWithinTextarea } from "../../src";
import Code from "./Code";
import CodeSandbox from "./CodeSandbox";

const Example = ({
  title,
  text,
  initialValue,
  highlight,
  code,
  codeSandbox,
  onChange,
  onDraftJSChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const onChange2 = onChange ? (value) => {
    setValue(onChange(value))
  } : setValue;
  const onDraftJSChange2 = onDraftJSChange
    ? (value) => setValue(onDraftJSChange(value))
    : undefined;
  code = code || "undefined";
  let style = {
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
            onDraftJSChange={onDraftJSChange2}
            rows="4"
            containerStyle={{ width: "100%" }}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <Code code={code} />
          <CodeSandbox
            style={{ position: "absolute", bottom: 8, right: 8 }}
            codeSandbox={codeSandbox}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Example;
