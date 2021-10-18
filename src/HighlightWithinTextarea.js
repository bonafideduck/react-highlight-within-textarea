import React from "react";
import { useState, forwardRef, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, ContentState } from "draft-js";
import createDecorator from "./createDecorator.js";

const HighlightWithinTextareaFunc = forwardRef((props, fwdRef) => {
  const { placeholder, highlight, onChange, onDraftJSChange } = props;
  let { value } = props;
  const [, forceUpdate] = React.useState();
  const ref = useRef({});
  let editorState;

  if (typeof value == "string") {
    const { prevValue, prevEditorState, nextValue, nextEditorState } =
      ref.current;
    if (nextValue == value) {
      // Change was accepted or there was cursor movement.
      editorState = nextEditorState;
    } else if (prevValue == value) {
      // They blocked the state change.
      editorState = prevEditorState;
    } else if (prevEditorState) {
      // They chose a whole new value.
      const contentState = ContentState.createFromText(value);
      const changeType = "change-block-data";
      editorState = EditorState.push(prevEditorState, contentState, changeType);
    } else {
      // First time in here.
      const contentState = ContentState.createFromText(value);
      editorState = EditorState.createWithContent(contentState);
    }
  } else {
    // They pulled open the hood and did their own editorState fun.
    editorState = value;
    value = editorState.getCurrentContent().getPlainText();
  }

  const contentState = editorState.getCurrentContent();
  const decorator = useMemo(
    () => createDecorator(contentState, highlight, value),
    [contentState, highlight, value]
  );

  editorState = EditorState.set(editorState, {
    decorator: decorator,
  });

  ref.current = { prevEditorState: editorState, prevValue: value };

  const onDraftChange = (nextEditorState) => {
    const nextValue = nextEditorState.getCurrentContent().getPlainText();
    ref.current = {
      ...ref.current,
      nextEditorState: nextEditorState,
      nextValue: nextValue,
    };

    if (value == nextValue) {
      // This is just cursor movement or selection changes.
      forceUpdate({});
    } else {
      onChange(nextValue);
    }
    if (onDraftJSChange) {
      onDraftJSChange(nextEditorState);
    }
  };

  return (
    <Editor
      editorState={editorState}
      onChange={onDraftChange}
      placeholder={placeholder}
      ref={fwdRef}
    />
  );
});

/*
 * For some reason, exporting a FunctionComponent
 * doesn't work when importing in codepen.io, so wrap
 * it in a class component.
 */
class HighlightWithinTextarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return <HighlightWithinTextareaFunc {...this.props} />;
  }
}

HighlightWithinTextarea.propTypes = {
  onChange: PropTypes.func,
  onDraftJSChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string.isRequired, EditorState]),
  highlight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.instanceOf(RegExp),
    PropTypes.object,
    PropTypes.func,
  ]),
  placeholder: PropTypes.string,
};

HighlightWithinTextarea.defaultProps = {
  highlight: null,
  placeholder: "Enter some text...",
};

export default HighlightWithinTextarea;
