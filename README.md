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
[demo page](https://bonafideduck.github.io/react-highlight-within-textarea/).

## Properties

placeholder, highlight, onChange, value

**value**: This can either be the text value or a DraftJs [EditorState](https://draftjs.org/docs/api-reference-editor-state/#internaldocs-banner).

**onChange**: This is called whenever the text value changes.  You must upcate value to accepth this change.

**onDraftJSChange**: Whenever there is any change, including cursor motion, this is called with a EditorState from DraftJS.  This can be used for more advanced interaction with DraftJS.  

**ref**: Standard React ref.

**placeholder**: The placeholder text to print when no value is set.

**highlight**: This specifies what to highlght.  For more info, see the
[demo page](https://bonafideduck.github.io/react-highlight-within-textarea/).


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

* The 2.0 component was created using [nwb](https://github.com/insin/nwb)
* This is essentially a wrapper of [Draft.js](https://draftjs.org)
* This component is a port of the [highlight-within-textarea](https://www.npmjs.com/package/highlight-within-textarea) jquery plugin to React.
