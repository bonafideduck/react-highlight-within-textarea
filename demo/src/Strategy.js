import React from "react";
import Example from "./Example.js";

const code = `const getSmileyDayString = (contentBlock, callback, contentStat) => {
  const dayStrings = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const text = contentBlock.getText();

  // Do nothing if there is not a smiley.
  if (text.indexOf(":)") !== -1) {
    // The below code searches for every instance of today.
    const textLower = text.toLowerCase();
    const dayString = dayStrings[new Date().getDay()];
    let index;
    // eslint-disable-next-line no-cond-assign
    while ((index = textLower.indexOf(dayString, index)) !== -1) {
      callback(index, index + dayString.length);
      index += dayString.length;
    }
  }
};

const StrategyDemo(props) {
  ...
  return <HighlightWithinTextarea
    highlight={getSmileyDayString}
    ...
  />;
}`;

const getSmileyDayString = (contentBlock, callback, contentStat) => {
  const dayStrings = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const text = contentBlock.getText();

  if (text.indexOf(":)") !== -1) {
    const textLower = text.toLowerCase();
    const dayString = dayStrings[new Date().getDay()];
    let index;
    // eslint-disable-next-line no-cond-assign
    while ((index = textLower.indexOf(dayString, index)) !== -1) {
      callback(index, index + dayString.length);
      index += dayString.length;
    }
  }
};

let text = (
  <span>
    You can use a strategy for custom logic. It exposes the underlying{" "}
    <a href="https://draftjs.org/">Draft.js</a>{" "}
    <a href="https://draftjs.org/docs/advanced-topics-decorators/">
      compositeDecorator
    </a>{" "}
    strategy.
  </span>
);

const Strategy = () => {
  return (
    <>
      <Example
        title="Strategy"
        text={text}
        initialValue="Sun Mon Tue Wed Thu Fri Sat :) <-- remove the smiley..."
        highlightText={'"potato"'}
        highlight={getSmileyDayString}
        code={code}
        codeSandbox="rhwta-strategy-y1965"
      />
    </>
  );
};

export default Strategy;
