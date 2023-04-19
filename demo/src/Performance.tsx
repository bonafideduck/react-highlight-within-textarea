import React from "react";
import { useState, useEffect } from "react";
import HighlightWithinTextarea from "react-highlight-within-textarea";

const style = {
  margin: 8,
  border: "solid 1pt black",
  overflow: "scroll",
  textAlign: "left" as const,
};

const ranges = (text: string): [start: number, end: number][] => {
  // Returns spans of non-spaces.
  let retVal: [start: number, end: number][] = [];

  for (let start = 0; start < text.length; start += 1) {
    if (text[start] !== " ") {
      let end = start + 1;
      while (end < text.length && text[end] !== " ") {
        end += 1;
      }
      retVal.push([start, end]);
    }
  }
  return retVal;
};

function Performance() {
  const [value, setValue] = useState(
    String("Potato potato tomato potato. ").repeat(500)
  );
  let highlight = ranges(value);
  let prevText = value;

  const onChange = (text:string) => {
    console.profile('render');
    highlight = ranges(text);
    if (Object.is(text, prevText)) {
      console.profileEnd('render');
      return;
    }
    prevText = text;
    setValue(text);
  }

  useEffect(() => {
    console.profileEnd('render');
  });

  return (
    <div className="App">
      <h1>HighlightWithinTextarea</h1>
      <h2>Performance (Ranges)</h2>
      <div style={style}>
        <HighlightWithinTextarea
          value={value}
          onChange={onChange}
          highlight={highlight}
        />
      </div>
    </div>
  );
}

export { Performance };
