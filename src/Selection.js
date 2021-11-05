import { EditorState, SelectionState } from "draft-js";

function editorStateToTextAnchorFocus(editorState) {
  if (!editorState) {
    return { anchor: 0, focus: 0 };
  }
  let contentState = editorState.getCurrentContent();
  let selection = editorState.getSelection();
  let blocks = contentState.getBlocksAsArray();
  let anchorKey = selection.anchorKey;
  let anchorOffset = selection.anchorOffset;
  let focusKey = selection.focusKey;
  let focusOffset = selection.focusOffset;
  let blockStart = 0;
  let anchor = undefined;
  let focus = undefined;

  for (const block of blocks) {
    if (block.key == anchorKey) {
      anchor = blockStart + anchorOffset;
    }
    if (block.key == focusKey) {
      focus = blockStart + focusOffset;
    }
    if (anchor != undefined && focus != undefined) {
      break;
    }
    blockStart += block.getLength() + 1;
  }
  if (anchor == undefined || focus == undefined) {
    throw new ReferenceError("Potentially corrupt editorState.");
  }

  return { anchor, focus };
}

function forceSelection(editorState, anchor, focus) {
  if (!editorState) {
    throw new ReferenceError("editorState is required");
  }
  let contentState = editorState.getCurrentContent();
  let blocks = contentState.getBlocksAsArray();
  let blockStart = 0;
  let blockEnd = undefined;
  let anchorKey = undefined;
  let anchorOffset = undefined;
  let focusKey = undefined;
  let focusOffset = undefined;
  let block = undefined;

  for (block of blocks) {
    blockEnd = blockStart + block.getLength();

    if (anchorKey == undefined && blockEnd >= anchor) {
      anchorKey = block.key;
      anchorOffset = Math.max(0, anchor - blockStart);
    }

    if (focusKey == undefined && blockEnd >= focus) {
      focusKey = block.key;
      focusOffset = Math.max(0, focus - blockStart);
    }

    if (anchorKey != undefined && focusKey != undefined) {
      break;
    }
  }

  if (anchorKey == undefined) {
    anchorKey = block.key;
    anchorOffset = block.getLength();
  }

  if (focusKey == undefined) {
    focusKey = block.key;
    focusOffset = block.getLength();
  }

  let selectionState = SelectionState.createEmpty()
    .set("anchorKey", anchorKey)
    .set("anchorOffset", anchorOffset)
    .set("focusKey", focusKey)
    .set("focusOffset", focusOffset);

  return EditorState.forceSelection(editorState, selectionState);
}

class Selection {
  #private;

  constructor(editorStateOrAnchor, focus) {
    let editorState = undefined;
    let anchor = undefined;
    let initFunc = () => undefined;

    if (typeof editorStateOrAnchor == "number") {
      anchor = editorStateOrAnchor;
      focus = focus == undefined ? anchor : focus;
    } else {
      editorState = editorStateOrAnchor;
      initFunc = () => {
        this.#private = {
          ...this.#private,
          ...editorStateToTextAnchorFocus(this.#private.editorState),
          init: () => undefined,
        };
      };
    }

    this.#private = {
      editorState,
      anchor,
      focus,
      init: initFunc,
    };
  }

  get anchor() {
    this.#private.init();
    return this.#private.anchor;
  }

  set anchor(value) {
    this.#private.init();
    this.#private.anchor = value;
  }

  get focus() {
    this.#private.init();
    return this.#private.focus;
  }

  set focus(value) {
    this.#private.init();
    this.#private.focus = value;
  }

  get start() {
    return Math.min(this.anchor, this.focus);
  }

  set start(value) {
    throw new ReferenceError("start is read only.  use anchor instead");
  }

  get end() {
    return Math.max(this.anchor, this.focus);
  }

  set end(value) {
    throw new ReferenceError("end is read only.  use focus instead");
  }

  forceSelection(editorState) {
    return forceSelection(editorState, this.anchor, this.focus);
  }

  getHasFocus() {
    let editorState = this.#private.editorState;
    return editorState && editorState.getHasFucus();
  }
}

export { Selection };
