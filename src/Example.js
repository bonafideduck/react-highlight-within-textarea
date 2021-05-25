import React from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HighlightWithinTextarea } from "./components";

const crToBR = (text) => {
  let split = text.split("\n");
  let arr = [];

  for (const index in split) {
    arr.push(<span key={index}>{split[index]}</span>);
    arr.push(<br key={"b" + index} />);
  }
  arr.pop();
  return arr;
};

const Example = ({ title, text, initialValue, highlightText, highlight }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Row>
      <Col>
        <h2>{title}</h2>
        <p>{text}</p>
        <HighlightWithinTextarea
          value={value}
          highlight={highlight}
          onChange={(value) => setValue(value)}
          rows="4"
          containerStyle={{ width: "100%" }}
          style={{ width: "100%" }}
        />
        <pre>
          function Demo() {"{"}
          <br />
          {"  "}const highlight = {crToBR(highlightText)};<br />
          <br />
          {"  "}
          {"return <HighlightWithinTextarea highlight={highlight} />;"}
          <br />
          {"}"}
        </pre>
      </Col>
    </Row>
  );
};

export default Example;
