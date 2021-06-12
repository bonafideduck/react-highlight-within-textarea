# react-highlight-within-textarea

> React component for highlighting bits of text within a textarea

## Version 2: A complete re-write using draft.js

Version 1 of react-hightlight-within-textarea used a trick of placing the 
highlights behind a true textarea.  This had many issues with wrapping
and font sizes getting the hightlight and textarea out of sync.
This complete rewrite is a simple wrapper of draft-js to accomplish
the same end result, but **much** less buggy.

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
  return (
    <HighlightWithinTextarea
      value={value}
      highlight={/[XYZ]/g}
      onChange= {event => setValue(event.target.value)}
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

**value**: In React, you must supply a value and update it within the textarea.

**onChange**: In React, you must supply an onChange function that updates the value.

**ref**: Standard React ref.

**placeholder**: The placeholder text to print when no value is set.

**highlight**: This specifies what to highlght.  For more info, see the
[demo page](https://bonafideduck.github.io/react-highlight-within-textarea/).


## Known and Potential Issues

The removal of a real textarea from this code and the switch to use a draft-js div may introduce issues that have not yet been validated.  But the improvements that version 2.0 outweights the potentiall issues and thus 2.0 has been released.  Below is a list of potential issues that still need to be explored.

* Form submit might not work.  To be honest, I don't even know how React works with form submit buttons.
* Accessible Rich Internet Applications [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) may not be supported.
* Reference forwarding probably works, but it hasn't been tested.
* Tab between form elements may not work. I haven't looked into this at all.

## License

MIT © [bonafideduck](https://github.com/bonafideduck)

---

* The 2.0 component was created using [nwb](https://github.com/insin/nwb)
* This component is a port of the [highlight-within-textarea](https://www.npmjs.com/package/highlight-within-textarea) jquery plugin to React.
