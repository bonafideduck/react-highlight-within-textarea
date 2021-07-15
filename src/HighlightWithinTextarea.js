import React from "react";
import { useState, forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, ContentState } from "draft-js";
import createDecorator from "./createDecorator.js";

const HighlightWithinTextareaFunc = forwardRef((props, ref) => {
  const { placeholder, highlight, onChange, value } = props;
  let [onChangeState, setOnChangeState] = useState({
    prev: { value: null, editorState: null },
    next: {
      value: value,
      editorState: EditorState.createWithContent(
        ContentState.createFromText(value)
      ),
    },
  });

  let editorState;

  if (value === onChangeState.next.value) {
    // Initial call or the parent onChange accepted this new value.
    editorState = onChangeState.next.editorState;
  } else if (value === onChangeState.prev.value) {
    // The parent onChange refused or hasn't yet gotten the new value.
    editorState = onChangeState.prev.editorState;
  } else {
    // The parent chose an entirely new value. Update previous.
    const contentState = ContentState.createFromText(value);
    editorState = EditorState.push(
      onChangeState.prev.editorState,
      ContentState,
      "change-block-data"
    );
  }
  let contentState = editorState.getCurrentContent();

  const decorator = useMemo(
    () => createDecorator(contentState, highlight, value),
    [contentState, highlight, value]
  );

  editorState = EditorState.set(editorState, {
    decorator: decorator,
  });

  const onDraftChange = (nextEditorState) => {
    const nextValue = editorState.getCurrentContent().getPlainText();
    setOnChangeState({
      prev: { value: value, editorState: editorState },
      next: { value: nextValue, editorState: nextEditorState },
    });
    onChange(value);
  };

  return (
    <Editor
      editorState={editorState}
      onChange={onDraftChange}
      placeholder={placeholder}
      ref={ref}
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
