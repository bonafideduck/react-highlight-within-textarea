import React from "react";
import { useState, useEffect, memo } from "react";
import { Editor, EditorState, ContentState, ContentBlock, CompositeDecorator } from "draft-js";

const style = {
  margin: 8,
  border: "solid 1pt black",
  overflow: "scroll",
  textAlign: "left" as const,
};

const component = memo(
  (props: { children?: Array<React.ReactNode>; decoratedText: string }) => (
    <mark>{props.children}</mark>
  ),
  (a, b) => a.decoratedText === b.decoratedText
);

const strategy = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) => {
  const text = contentBlock.getText();
  for (let start = 0; start < text.length; start += 1) {
    if (text[start] !== " ") {
      let end = start + 1;
      while (end < text.length && text[end] !== " ") {
        end += 1;
      }
      callback(start, end);
      start = end;
    }
  }
};

const decorator = new CompositeDecorator([{ strategy, component }]);
const initialText = String("Potato potato tomato potato. ").repeat(500);

function DraftPerf() {
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(ContentState.createFromText(initialText), decorator)); 
  let prevEditorState = editorState;

  const onChange = ((editorState: EditorState) => {
    console.profile("render");
    if (Object.is(editorState, prevEditorState)) {
      console.profileEnd("render");
      return;
    }
    prevEditorState = editorState;
    setEditorState(editorState);
  });

  useEffect(() => {
    console.profileEnd("render");
  });

  return (
    <div className="App">
      <h1>HighlightWithinTextarea</h1>
      <h2>Raw Draft Performance (Ranges)</h2>
      <div style={style}>
        <Editor
          onChange={onChange}
          editorState={editorState}
        />
      </div>
    </div>
  );
}

export { DraftPerf };
