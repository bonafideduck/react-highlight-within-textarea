import React from "react";
import { useState, forwardRef, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, ContentState } from "draft-js";
import createDecorator from "./createDecorator.js";

const HighlightWithinTextareaFunc = forwardRef((props, fwdRef) => {
  const { placeholder, highlight, onChange, onDraftJSChange, value } = props;
  const [, forceUpdate] = React.useState();
  const nextStateRef = useRef({});
  let editorState;

  if (typeof (value) == 'string') {
    const nextValue = nextStateRef.current.nextValue;
    if (nextValue == value) {
      // Likely the result of cursor movement.
      editorState = nextStateRef.current.nextEditorState;
    } else {
      editorState = EditorState.createWithContent(
        ContentState.createFromText(value)
      );
    }
  } else {
    // They pulled open the hood and did their own editorState fun.
    editorState = value;
  }

  const contentState = editorState.getCurrentContent();
  const decorator = useMemo(
    () => createDecorator(contentState, highlight, value),
    [contentState, highlight, value]
  );

  editorState = EditorState.set(editorState, {
    decorator: decorator,
  });

  const onDraftChange = (nextEditorState) => {
    const nextValue = nextEditorState.getCurrentContent().getPlainText();
    nextStateRef.current = {
      nextEditorState: nextEditorState,
      nextValue: nextValue,
    }

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
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    EditorState,
  ]),
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
