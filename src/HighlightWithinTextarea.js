import React from "react";
import { useState, forwardRef, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, ContentState } from "draft-js";
import createDecorator from "./createDecorator.js";

let uid = (() => {
  let map = new Map();
  return (value) => {
    let retval = map.get(value);
    if (retval == undefined) {
      retval = map.size
      map.set(value, retval);
    }
    return retval;
  };
})();

const HighlightWithinTextareaFunc = forwardRef((props, fwdRef) => {
  const { placeholder, highlight, onChange, value } = props;
  const [, forceUpdate] = React.useState();
  const ref = useRef({}).current;

  // console.log([
  //   "ocs",
  //   value,
  //   onChangeState.prev.value,
  //   onChangeState.next.value,
  // ]);
  console.log("HWTA", value)
  if (!ref.current) {
    // First time
    ref.current = EditorState.createWithContent(
      ContentState.createFromText(value))
    ref.pending = null;
    console.log("case 0", uid(ref.pending), uid(ref.current));
  } else if (ref.pending && value === ref.pending.getCurrentContent().getPlainText()) {
    // The pending value was accepted by parent.
    ref.current = ref.pending;
    ref.pending = null;
    console.log("case 1", uid(ref.pending), uid(ref.current));
  } else if (ref.current && value === ref.current.getCurrentContent().getPlainText()) {
    // The parent blocked the onChange()
    ref.pending = null;
    console.log("case 2", uid(ref.pending), uid(ref.current));
  } else {
    // The parent chose an entirely new value. Update previous.
    const contentState = ContentState.createFromText(value);
    ref.current = EditorState.push(
      ref.current,
      ContentState,
      "change-block-data"
    );
    ref.pending = null;
    console.log("case 3", uid(ref.pending), uid(ref.current));
  }

  //const contentState = ref.current.getCurrentContent()
  //
  // const decorator = useMemo(
  //   () => createDecorator(contentState, highlight, value),
  //   [contentState, highlight, value]
  // );

  // ref.current = EditorState.set(ref.current, {
  //   decorator: decorator,
  // });

  const onDraftChange = (nextEditorState) => {
    const changeType = nextEditorState.getLastChangeType()
    if (changeType === null) {
      // This is a non-textual change.  Just save the new state.
      console.log("onDraftChange: null changetype", uid(ref.pending), uid(ref.current))
      ref.current = nextEditorState
      forceUpdate({});
      return
    }

    const nextValue = nextEditorState.getCurrentContent().getPlainText();
    console.log("onDraftChange called: ", uid(ref.pending), uid(ref.current), nextValue)
    ref.pending = nextEditorState;
    onChange(nextValue);
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
