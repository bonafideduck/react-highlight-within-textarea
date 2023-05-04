import React from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  HighlightWithinTextarea,
  Selection,
  Highlight,
} from "react-highlight-within-textarea";
import { Code } from "./Code";
import { CodeSandbox } from "./CodeSandbox";

const Example = (props: {
  title: string;
  text: JSX.Element | string;
  initialValue: string;
  highlight: Highlight;
  code: string;
  codeSandbox: string;
  onChange?: (nextValue: string, selection?: Selection) => string;
  selection?: Selection;
}) => {
  let {
    title,
    text,
    initialValue,
    highlight,
    code,
    codeSandbox,
    onChange,
    selection,
  } = props;
  const [value, setValue] = useState<string>(initialValue);
  const onChange2 = (value: string, selection?: Selection) => {
    let newValue = value;
    if (onChange) {
      newValue = onChange(value, selection);
    }
    setValue(newValue);
  };
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
