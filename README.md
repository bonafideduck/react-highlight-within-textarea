# react-highlight-within-textarea

> React component for highlighting spans of text within a textarea

[![NPM](https://img.shields.io/npm/v/react-highlight-within-textarea.svg)](https://www.npmjs.com/package/react-highlight-within-textarea) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![Yarn Test](https://github.com/bonafideduck/react-highlight-within-textarea/workflows/Yarn%20Test/badge.svg)


## Install

```bash
npm install --save react-highlight-within-textarea
```
```
yarn add react-highlight-within-textarea
```

## Usage

```jsx
import React from 'react';
import { useState } from 'react';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'

const Example = () => {
  const [value, setValue] = useState("X Y Z and then XYZ");
  const onChange = (value) => setValue(value);
  return (
    <HighlightWithinTextarea
      value={value}
      highlight={/[XYZ]/g}
      onChange= {onChange}
    />
  );
};
```

The highlight property accepts several different types of values to describe 
what will be highlighted.  You can see the various ways to highlight things, 
along with example code, on the 
[documentation and demo page](https://bonafideduck.github.io/react-highlight-within-textarea/).

## Properties

The following properties are used directly by this library.  Additional properties are passed 
unmodified directly to the [Draft.js](https://draftjs.org) [Editor Component](https://draftjs.org/docs/api-reference-editor).

**value**: This can either be the text value or a DraftJs [EditorState](https://draftjs.org/docs/api-reference-editor-state/#internaldocs-banner).

**onChange**: This is called whenever the text value or selection changes.  You must update value to accept this change.  You only have to set the selection property if you want to change the current selection.

**highlight**: This specifies what to highlght.  For more info, see the
[demo page](https://bonafideduck.github.io/react-highlight-within-textarea/).

**selection**: A selection containing `anchor` and `focus` that can be use to place the cursor or set selections.

**ref**: This returns a forwardRef to the underlying [Draft.js](https://draftjs.org) [Editor Component](https://draftjs.org/docs/api-reference-editor).

## Properties passed directly to Draft.js Editor Component

The following properties are passed unmodified directly to the [Draft.js](https://draftjs.org) [Editor Component](https://draftjs.org/docs/api-reference-editor).

[autoCapitalize](https://draftjs.org/docs/api-reference-editor#autocapitalize)
[autoComplete](https://draftjs.org/docs/api-reference-editor#autocomplete)
[autoCorrect](https://draftjs.org/docs/api-reference-editor#autocorrect)
[editorKey](https://draftjs.org/docs/api-reference-editor#editorkey)
[handleBeforeInput](https://draftjs.org/docs/api-reference-editor#handlebeforeinput)
[handleDrop](https://draftjs.org/docs/api-reference-editor#handledrop)
[handleDroppedFiles](https://draftjs.org/docs/api-reference-editor#handledroppedfiles)
[handleKeyCommand](https://draftjs.org/docs/api-reference-editor#handlekeycommand)
[handlePastedFiles](https://draftjs.org/docs/api-reference-editor#handlepastedfiles)
[handlePastedText](https://draftjs.org/docs/api-reference-editor#handlepastedtext)
[handleReturn](https://draftjs.org/docs/api-reference-editor#handlereturn)
[keyBindingFn](https://draftjs.org/docs/api-reference-editor#keybindingfn)
[onBlur](https://draftjs.org/docs/api-reference-editor#onblur)
[onFocus](https://draftjs.org/docs/api-reference-editor#onfocus)
[placeholder](https://draftjs.org/docs/api-reference-editor#placeholder)
[readOnly](https://draftjs.org/docs/api-reference-editor#readonly)
[spellCheck](https://draftjs.org/docs/api-reference-editor#spellcheck)
[stripPastedStyles](https://draftjs.org/docs/api-reference-editor#strippastedstyles)
[textAlignment](https://draftjs.org/docs/api-reference-editor#textalignment)
[textDirectionality](https://draftjs.org/docs/api-reference-editor#textdirectionality)

## Known and Potential Issues

The following have not yet been verified to work or have issues.

* Form submit might not work.  To be honest, I don't even know how React works with form submit buttons.
* Accessible Rich Internet Applications [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) may not be supported.
* Reference forwarding probably works, but it hasn't been tested.
* Tab between form elements may not work. I haven't looked into this at all.

## Changes

See [HISTORY.md](https://github.com/bonafideduck/react-highlight-within-textarea/blob/main/HISTORY.md)

## License

MIT © [bonafideduck](https://github.com/bonafideduck)

---

* The 3.0 component was created using [this blog post](https://prateeksurana.me/blog/react-library-with-typescript/) by Prateek Surana.
* The 2.0 component was created using [nwb](https://github.com/insin/nwb)
* This is essentially a wrapper of [Draft.js](https://draftjs.org)
* This component is a port of the [highlight-within-textarea](https://www.npmjs.com/package/highlight-within-textarea) jquery plugin to React.
