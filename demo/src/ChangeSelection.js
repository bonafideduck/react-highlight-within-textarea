import React from "react";
import { useState } from "react";
import { Example } from "./Example.js";
import { Selection } from "../../src";

const code = `const ChangeSelection = () => {
  const initialValue = "Here's a blueberry. There's a strawberry. Surprise, it's a banananana!";
  let [value, setValue] = useState(initialValue);
  let [selection, setSelection] = useState(() => new Selection(30, 40));

  let anchorMinus = () => {
    if (selection.anchor > 0) {
      setSelection(new Selection(selection.anchor - 1, selection.focus));
    }
  };

  let focusPlus = () => {
    if (selection.focus < value.length) {
      setSelection(new Selection(selection.anchor, selection.focus + 1));
    }
  };

  let onChange = (value, selection) => {
    setSelection(selection);
    setValue(value);
  };

  return (
    <>
      <div>
        <button onClick={anchorMinus}>-</button>
        <div>Anchor: {selection.anchor}</div>
        <div>Focus: {selection.focus}</div>
        <button onClick={focusPlus}>+</button>
      </div>
      <HighlightWithinTextarea 
        value={value}
        selection={selection}
        onChange={onChange}
      />
    </>
  );
}`;

const ChangeSelection = () => {
  let initialValue =
    "Here's a blueberry. There's a strawberry. Surprise, it's a banananana!";

  let [state, setState] = useState(() => ({
    value: initialValue,
    selection: new Selection(30, 40),
    anchor: 30,
    focus: 40,
  }));
  let anchorMinus = () => {
    if (state.anchor > 0) {
      const anchor = state.anchor - 1;
      setState({
        ...state,
        anchor,
        selection: new Selection(anchor, state.focus),
      });
    }
  };
  let focusPlus = () => {
    if (state.focus < state.value.length) {
      const focus = state.focus + 1;
      setState({
        ...state,
        focus,
        selection: new Selection(state.anchor, focus),
      });
    }
  };
  let onChange = (value, selection) => {
    const { anchor, focus } = selection;
    setState({ ...state, value, anchor, focus, selection: undefined });
    return value;
  };
  return (
    <>
      <h2></h2>

      <Example
        title="Selection"
        text={
          <>
            <span>
              ReactHighlightWithinTextarea takes selection property that allows
              the{" "}
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Selection#glossary">
                anchor and focus
              </a>{" "}
              to be set. This also gets passed with the onChange event.
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 4,
                marginBottom: 4,
                textAlign: "center",
              }}
            >
              <button onClick={anchorMinus}>-</button>
              <div style={{ minWidth: "6em" }}>Anchor: {state.anchor}</div>
              <div style={{ minWidth: "6em" }}>Focus: {state.focus}</div>
              <button onClick={focusPlus}>+</button>
            </div>
          </>
        }
        initialValue={state.value}
        highlight="TOMAT"
        onChange={onChange}
        code={code}
        codeSandbox="rhwta-string-cg4y99"
        selection={state.selection}
      />
    </>
  );
};

export { ChangeSelection };
