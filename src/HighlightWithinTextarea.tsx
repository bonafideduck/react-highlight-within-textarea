import React from "react";
import { useState, useRef, useMemo } from "react";
import { Editor, EditorState, ContentState, SelectionState } from "draft-js";
import { Selection } from "./Selection";
import { Highlight } from "./types";
import { DecoratorFactory } from "./DecoratorFactory";
interface MyRef {
  prevValue: string;
  prevEditorState: EditorState;
  nextValue: string;
  nextEditorState: EditorState;
}

export interface HWTAProps {
  value: string;
  onChange?: (nextValue: string, selection?: Selection) => void;
  highlight?: Highlight;
  placeholder?: string;
  selection?: Selection;
  textAlignment?: "left" | "center" | "right";
  textDirectionality?: "LTR" | "RTL" | "NEUTRAL";
  autoCapitalize?: string;
  autoComplete?: string;
  autoCorrect?: string;
  readOnly?: boolean;
  spellCheck?: boolean;
  stripPastedStyles?: boolean;
  editorKey?: string;
  handleReturn?: (e: any, editorState: EditorState) => any;
  handleKeyCommand?: (
    command: string,
    editorState: EditorState,
    eventTimeStamp: number
  ) => any;
  handleBeforeInput?: (
    chars: string,
    editorState: EditorState,
    eventTimeStamp: number
  ) => any;
  handlePastedText?: (
    text: string,
    html?: string,
    editorState?: EditorState
  ) => any;
  handlePastedFiles?: (files: Array<Blob>) => any;
  handleDroppedFiles?: (selection: SelectionState, files: Array<Blob>) => any;
  handleDrop?: (
    selection: SelectionState,
    dataTransfer: Object,
    isInternal: any
  ) => any;
  keyBindingFn?: (e: any) => any;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
}

const HighlightWithinTextarea = React.forwardRef<Editor, HWTAProps>(
  (props, ref) => {
    let {
      value,
      onChange,
      highlight,
      placeholder = "Enter some text...",
      selection,
    } = props;
    const [, forceUpdate] = useState({});
    const myRef: any = useRef({});
    const decoratorFactory = useRef(new DecoratorFactory());
    let editorState;

    const { prevValue, prevEditorState, nextValue, nextEditorState } =
      myRef.current as MyRef;

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
    let decorator;
    decorator = useMemo(
      () =>
        highlight &&
        decoratorFactory.current.create(contentState, highlight as Highlight, value),
      [contentState, highlight, value]
    );

    editorState = EditorState.set(editorState, {
      decorator: decorator,
    });

    if (selection) {
      editorState = selection.forceSelection(editorState);
    }

    myRef.current = {
      prevEditorState: editorState,
      prevValue: value,
    };

    const onDraftChange = (nextEditorState: EditorState) => {
      const nextValue = nextEditorState.getCurrentContent().getPlainText();
      myRef.current = {
        ...myRef.current,
        nextEditorState: nextEditorState,
        nextValue: nextValue,
      };
      let selection = undefined;

      selection = new Selection(nextEditorState);
      if (onChange) {
        onChange(nextValue, selection);
      }
      forceUpdate({});
    };

    const newProps = { ...props };
    delete newProps.highlight;
    delete newProps.selection;
    delete newProps.placeholder;
    delete newProps.onChange;
    delete (newProps as { value?: string }).value;

    return (
      <Editor
        {...newProps}
        editorState={editorState}
        onChange={onDraftChange}
        placeholder={placeholder}
        ref={ref}
      />
    );
  }
);

export default HighlightWithinTextarea;
