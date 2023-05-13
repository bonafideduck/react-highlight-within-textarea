import React from "react";
import { useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Editor, EditorState, ContentState } from "draft-js";
import { DecoratorFactory, Selection } from "react-highlight-within-textarea";
import { Code } from "./Code";
import { CodeSandbox } from "./CodeSandbox";

const code = `const Unwrapped = () => {
  let [editorState, setEditorState] = useState(() => {
    const value = "apple watermelon banana orange mango";
    const contentState = ContentState.createFromText(value);
    return EditorState.createWithContent(contentState);
  });

  const highlight = ["orange", /ba(na)*/gi, [0, 5] as [number, number]];
  const contentState = editorState.getCurrentContent();
  const decoratorFactory = useRef(new DecoratorFactory()).current;
  const decorator = decoratorFactory.create(contentState, highlight);

  editorState = EditorState.set(editorState, {
    decorator: decorator,
  });

  const value = contentState.getPlainText();
  const selection = new Selection(editorState);
  while ((value[selection.anchor] || " ") !== " ") {
    selection.anchor += 1;
    selection.focus += 1;
    editorState = selection.forceSelection(editorState);
  }
  
  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
    />
  );
};`;

const Unwrapped = () => {
  let [editorState, setEditorState] = useState(() => {
    const value = "apple watermelon banana orange mango";
    const contentState = ContentState.createFromText(value);
    return EditorState.createWithContent(contentState);
  });

  const highlight = ["orange", /ba(na)*/gi, [0, 5] as [number, number]];
  const contentState = editorState.getCurrentContent();
  const decoratorFactory = useRef(new DecoratorFactory()).current;
  const decorator = decoratorFactory.create(contentState, highlight);

  editorState = EditorState.set(editorState, {
    decorator: decorator,
  });

  const value = contentState.getPlainText();
  const selection = new Selection(editorState);
  while ((value[selection.anchor] || " ") !== " ") {
    selection.anchor += 1;
    selection.focus += 1;
    editorState = selection.forceSelection(editorState);
  }

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
        <h2>Unwrap and Use Draft.js Directly</h2>
        The fundamental capabilities that ReacthighlightWithinTextarea uses can
        be used directly by <a href="https://draftjs.org/">Draft.js</a>{" "}
        <ul>
          <li>
            <b>DecoratorFactory</b> contains a cache of previously created
            memoized decorators.  Use this to generate new decorators based
            on the text and highlight.
          </li>
          <li>
            <b>Selection</b> extracts the text anchor and focus and changes these
            with forceSelection
          </li>
          <li>
            <a href="https://draftjs.org/docs/api-reference-editor-state/">
              EditorState
            </a>{" "}
            contains all the information about the text being edited, including
            history.{" "}
          </li>
          <li>
            <a href="https://draftjs.org/docs/api-reference-editor">
              Editor Component
            </a>{" "}
            takes the EditorState. And has a rich set of properties.
          </li>
        </ul>
       
        <div style={style}>
          <Editor editorState={editorState} onChange={setEditorState} />
        </div>
        <div style={{ position: "relative" }}>
          <Code code={code} />
          <CodeSandbox
            style={{ position: "absolute", bottom: 8, right: 8 }}
            codeSandbox="rhwta-unwrapped-06tsj"
          />
        </div>
        <hr />
      </Col>
    </Row>
  );
};

export { Unwrapped };
