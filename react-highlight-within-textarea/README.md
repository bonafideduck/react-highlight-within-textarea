# react-highlight-within-textarea

> React component for highlighting bits of text within a textarea

## Coming soon:  A complete re-write using draft.js

The current react-hightlight-within-textarea uses a trick of placing the 
highlights behind a true textarea.  This has many issues with wrapping
and font sizes getting the hightlight and textarea out of sync.
This complete rewrite is a simple wrapper of draft-js to accomplish
the same end result, but **much** less buggy.
See a [preview](https://bonafideduck.github.io/rhwta-preview/).
Look at the [code](https://github.com/bonafideduck/react-highlight-within-textarea/tree/nwb-2-alpha/src).


[![NPM](https://img.shields.io/npm/v/react-highlight-within-textarea.svg)](https://www.npmjs.com/package/react-highlight-within-textarea) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![Yarn Test](https://github.com/bonafideduck/react-highlight-within-textarea/workflows/Yarn%20Test/badge.svg)


## Install

```bash
npm install --save react-highlight-within-textarea
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

There are two notable elements within this component.  These are the
textarea and its surrounding container which facilitates the highlighting.
Unless otherwise specified below, properties will be applied to the textarea.
Some customization (like width) will need to be applied to both.

**value**: In React, you must supply a value and update it within the textarea.

**onChange**: In React, you must supply an onChange function that updates the value.

**highlight**: This specifies what to highlght.  For more info, see the
[demo page](https://bonafideduck.github.io/react-highlight-within-textarea/).

**containerStyle**: Some textarea styles will also have to be applied to the surrounding
container.  This directly applies to the container.

**containerClassName**: This adds classes to the surrounding container.

**all-other-properties**: All other properties will be directly applied to the textarea.

## Known Issues

Currently, textarea resizing is not supported.

## License

MIT © [bonafideduck](https://github.com/bonafideduck)

---

* This component was created using [create-react-hook](https://github.com/hermanya/create-react-hook).
* This component is a port of the [highlight-within-textarea](https://www.npmjs.com/package/highlight-within-textarea) jquery plugin to React.
* Special thanks to Joe Previte for [How to Release a Custom React Component, Hook, or Effect as an npm Package](https://www.twilio.com/blog/release-custom-react-component-hook-effect-npm-package).

