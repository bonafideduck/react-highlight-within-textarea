import React from "react";
import { useState } from "react";
import { Example } from "./Example";
import { Selection } from "react-highlight-within-textarea";

const code = `const ChangeSelection = () => {
  const initialValue = "Here's a blueberry. There's a strawberry. Surprise, it's a banananana!";
  let [value, setValue] = useState(initialValue);
  let [selection, setSelection] = useState(() => new Selection(30, 40));

  let anchorMinus = () => {
    if (state.anchor > 0) {
      const anchor = state.anchor - 1;
      const selection = new Selection(anchor, state.focus);
      setState({ ...state, anchor, selection });
    }
  };

  let focusPlus = () => {
    if (state.focus < state.value.length) {
      const focus = state.focus + 1;
      const selection = new Selection(state.anchor, focus);
      setState({ ...state, focus, selection });
    }
  };

  let onChange = (value, selection) => {
    const { anchor, focus } = selection;
    setState({ ...state, value, anchor, focus, selection: undefined });
    return value;
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
        value={state.value}
        highlight={"berry"}
        selection={state.selection}
        onChange={onChange}
      />
    </>
  );
}`;

type State = {
  value: string;
  selection?: Selection;
  anchor: number;
  focus: number;
};
const ChangeSelection = () => {
  let initialValue =
    "Here's a blueberry. There's a strawberry. Surprise, it's a banananana!";

  let [state, setState] = useState<State>(() => ({
    value: initialValue,
    selection: (new Selection(30, 40) as Selection) || undefined,
    anchor: 30,
    focus: 40,
  }));
  let anchorMinus = () => {
    if (state.anchor > 0) {
      const anchor = state.anchor - 1;
      const selection = new Selection(anchor, state.focus);
      setState({ ...state, anchor, selection });
    }
  };
  let focusPlus = () => {
    if (state.focus < state.value.length) {
      const focus = state.focus + 1;
      const selection = new Selection(state.anchor, focus);
      setState({ ...state, focus, selection });
    }
  };
  let onChange = (value: string, selection?: Selection) => {
    const { anchor, focus } = selection || { anchor: 0, focus: 0 };
    setState({ ...state, value, anchor, focus, selection: undefined });
    return value;
  };
  return (
    <>
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
        highlight=" "
        onChange={onChange}
        code={code}
        codeSandbox="rhwta-selection-lpkld"
        selection={state.selection}
      />
    </>
  );
};

export { ChangeSelection };
