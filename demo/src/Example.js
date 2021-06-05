import React from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HighlightWithinTextarea } from "../../src";
import Code from "./Code";

const Example = ({ title, text, initialValue, highlight, code }) => {
  const [value, setValue] = useState(initialValue);
  code=code || "undefined";
  return (
    <Row>
      <Col>
        <h2>{title}</h2>
        {text}
        <HighlightWithinTextarea
          value={value}
          highlight={highlight}
          onChange={(value) => setValue(value)}
          rows="4"
          containerStyle={{ width: "100%" }}
          style={{ width: "100%" }}
        />
        <Code code={code} />
      </Col>
    </Row>
  );
};

export default Example;
