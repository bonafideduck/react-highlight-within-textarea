import React from "react";
import { useState, forwardRef, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, ContentState } from "draft-js";
import createDecorator from "./createDecorator.js";

const HighlightWithinTextareaFunc = forwardRef((props, fwdRef) => {
  const { placeholder, highlight, onChange, value } = props;
  const [, forceUpdate] = React.useState();
  const ref = useRef({}).current;

  if (!ref.current) {
    // First time
    ref.current = EditorState.createWithContent(
      ContentState.createFromText(value)
    );
    ref.pending = null;
  } else if (
    ref.pending &&
    value === ref.pending.getCurrentContent().getPlainText()
  ) {
    // The pending value was accepted by parent.
    ref.current = ref.pending;
    ref.pending = null;
  } else if (
    ref.current &&
    value === ref.current.getCurrentContent().getPlainText()
  ) {
    // The parent blocked the onChange()
    ref.pending = null;
  } else {
    // The parent chose an entirely new value. Update previous.
    const contentState = ContentState.createFromText(value);
    ref.current = EditorState.push(
      ref.current,
      ContentState,
      "insert-fragment"
    );
    ref.pending = null;
  }

  const contentState = ref.current.getCurrentContent();
  const decorator = useMemo(
    () => createDecorator(contentState, highlight, value),
    [contentState, highlight, value]
  );

  ref.current = EditorState.set(ref.current, {
    decorator: decorator,
  });

  const onDraftChange = (nextEditorState) => {
    const changeType = nextEditorState.getLastChangeType();
    if (changeType === null) {
      // This is a non-textual change.  Just save the new state.
      ref.current = nextEditorState;
      forceUpdate({});
      return;
    }

    const nextValue = nextEditorState.getCurrentContent().getPlainText();
    ref.pending = nextEditorState;
    onChange(nextValue, changeType);
  };

  return (
    <Editor
      editorState={ref.current}
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
  value: PropTypes.string.isRequired,
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
