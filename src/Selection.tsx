import { EditorState, SelectionState } from "draft-js";

function editorStateToTextAnchorFocus(editorState?: EditorState) {
  if (!editorState) {
    return { anchor: 0, focus: 0 };
  }
  let contentState = editorState.getCurrentContent();
  let selection = editorState.getSelection();
  let blocks = contentState.getBlocksAsArray();
  let anchorKey = selection.getAnchorKey();
  let anchorOffset = selection.getAnchorOffset();
  let focusKey = selection.getFocusKey();
  let focusOffset = selection.getFocusOffset();
  let blockStart = 0;
  let anchor = undefined;
  let focus = undefined;

  for (const block of blocks) {
    if (block.getKey() == anchorKey) {
      anchor = blockStart + anchorOffset;
    }
    if (block.getKey() == focusKey) {
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

function forceSelection(editorState: EditorState, anchor: number, focus: number) {
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
      anchorKey = block.getKey();
      anchorOffset = Math.max(0, anchor - blockStart);
    }

    if (focusKey == undefined && blockEnd >= focus) {
      focusKey = block.getKey();
      focusOffset = Math.max(0, focus - blockStart);
    }

    if (anchorKey != undefined && focusKey != undefined) {
      break;
    }
  }

  if (block == undefined) {
    throw ("Unexpected undefined block");
  }

  if (anchorKey == undefined) {
    anchorKey = block.getKey();
    anchorOffset = block.getLength();
  }

  if (focusKey == undefined) {
    focusKey = block.getKey();
    focusOffset = block.getLength();
  }

  let selectionState = SelectionState.createEmpty('')
  selectionState.set("anchorKey", anchorKey)
    .set("anchorOffset", anchorOffset)
    .set("focusKey", focusKey)
    .set("focusOffset", focusOffset);

  return EditorState.forceSelection(editorState, selectionState);
}

class Selection {
  #private;

  constructor(editorStateOrAnchor: number | EditorState, focus?: number) {
    let editorState = undefined;
    let anchor = -1;
    let initFunc = (): void => undefined;

    if (typeof editorStateOrAnchor == "number") {
      anchor = editorStateOrAnchor;
      focus = focus == undefined ? anchor : focus;
    } else {
      focus = -1; // Silence ts until the below init is called
      editorState = editorStateOrAnchor;
      initFunc = (): void => {
        this.#private = {
          ...this.#private,
          ...editorStateToTextAnchorFocus(this.#private.editorState),
          init: (): void => undefined,
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

  get anchor(): number {
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
    throw new ReferenceError(`start (${value}) is read only.  use anchor instead`);
  }

  get end() {
    return Math.max(this.anchor, this.focus);
  }

  set end(value) {
    throw new ReferenceError(`end (${value}) is read only.  use focus instead`);
  }

  forceSelection(editorState: EditorState) {
    return forceSelection(editorState, this.anchor, this.focus);
  }

  getHasFocus() {
    let editorState = this.#private.editorState;
    return editorState && editorState.getSelection().getHasFocus();
  }
}

export { Selection };
