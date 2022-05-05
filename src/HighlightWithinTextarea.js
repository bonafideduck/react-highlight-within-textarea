import React from "react";
import { useState, forwardRef, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, ContentState } from "draft-js";
import { createDecorator } from "./createDecorator.js";
import { Selection } from "./Selection.js";

const HighlightWithinTextarea = forwardRef((props, fwdRef) => {
  const { highlight, onChange } = props;
  let { value, selection } = props;
  const [, forceUpdate] = useState();
  const ref = useRef({});
  let editorState;

  const { prevValue, prevEditorState, nextValue, nextEditorState } =
    ref.current;

  if (nextValue == value) {
    // Change was accepted.
    editorState = nextEditorState;
  } else if (prevValue == value) {
    // They blocked the state change.
    editorState = prevEditorState;
    if (!selection && nextValue) {
      selection = new Selection(editorState);
      selection.focus = Math.max(selection.anchor, selection.focus);
      selection.anchor = selection.focus;
    }
  } else if (prevEditorState) {
    // They chose a whole new value.
    const contentState = ContentState.createFromText(value);
    const changeType = "change-block-data";
    editorState = EditorState.push(prevEditorState, contentState, changeType);
    if (!selection) {
      let fixedValue, offset;
      if (nextEditorState) {
        selection = new Selection(nextEditorState);
        fixedValue = value.replaceAll("\r\n", "\n");
        offset = fixedValue.length - nextValue.length;
      } else {
        selection = new Selection(prevEditorState);
        fixedValue = value.replaceAll("\r\n", "\n");
        offset = fixedValue.length - prevValue.length;
      }
      selection.anchor += offset;
      selection.focus += offset;
    }
  } else {
    // First time in here.
    const contentState = ContentState.createFromText(value);
    editorState = EditorState.createWithContent(contentState);
  }

  const contentState = editorState.getCurrentContent();
  const decorator = useMemo(
    () => createDecorator(contentState, highlight, value),
    [contentState, highlight, value]
  );

  editorState = EditorState.set(editorState, {
    decorator: decorator,
  });

  if (selection) {
    editorState = selection.forceSelection(editorState);
  }

  ref.current = {
    prevEditorState: editorState,
    prevValue: value,
  };

  const onDraftChange = (nextEditorState) => {
    const nextValue = nextEditorState.getCurrentContent().getPlainText();
    ref.current = {
      ...ref.current,
      nextEditorState: nextEditorState,
      nextValue: nextValue,
    };
    let selection = undefined;

    selection = new Selection(nextEditorState);
    onChange(nextValue, selection);
    forceUpdate({});
  };

  const newProps = { ...props };
  delete newProps.highlight;
  delete newProps.selection;
  delete newProps.value;
  delete newProps.onChange;

  return (
    <Editor
      editorState={editorState}
      onChange={onDraftChange}
      {...newProps}
      ref={fwdRef}
    />
  );
});

HighlightWithinTextarea.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  highlight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.instanceOf(RegExp),
    PropTypes.object,
    PropTypes.func,
  ]),
  placeholder: PropTypes.string,
  selection: PropTypes.instanceOf(Selection),
  textAlignment: PropTypes.string,
  textDirectionality: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  autoCorrect: PropTypes.string,
  readOnly: PropTypes.bool,
  spellCheck: PropTypes.bool,
  stripPastedStyles: PropTypes.bool,
  editorKey: PropTypes.string,
  handleReturn: PropTypes.func,
  handleKeyCommand: PropTypes.func,
  handleBeforeInput: PropTypes.func,
  handlePastedText: PropTypes.func,
  handlePastedFiles: PropTypes.func,
  handleDroppedFiles: PropTypes.func,
  handleDrop: PropTypes.func,
  keyBindingFn: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

HighlightWithinTextarea.defaultProps = {
  highlight: null,
  placeholder: "Enter some text...",
};

export default HighlightWithinTextarea;
