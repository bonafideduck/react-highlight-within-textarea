import React, { useState, useEffect } from "react";
import Example from "./Example.js";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const text = (
  <span>
    The div behind the highlighted span can be wrapped in an enhancement. This
    React view receives properties, <code>data</code> which contains information
    about the particular span and <code>MarkView</code> which is the highlight
    that contains the text. If there are multiple enhancements, they will wrap
    around each other. Also note that a single highlight may be broken into two
    MarkViews if it overlaps two highlights. This effect can be seen below with
    the two pairs of indexes.
  </span>
);

const initialValue = `Here's a blueberry. There's a strawberry.  I'm a little blue because there is a highlight bug where a blueberry's highlight gets split over line breaks in Chrome incorrectly.  This makes me berry sad.
But the blues go away after a newline is forced.`;

const code = `const ToolTip = (props) => {
  const objects = { contentState: "(...)", children: "(...)" };
  const content = <pre>{JSON.stringify({ ...props, ...objects }, 0, 1)}</pre>;
  return (
    <Tippy content={content}>
      <mark>{props.children}</mark>
    </Tippy>
  );
}

const MultiColor = (props) => {
  const [color, setColor] = useState(0xff8800);
  const colorText = \`#\${color.toString(16)}\`;

  useEffect(() => {
    const recolor = () => setColor(0x808080 | (color + 0x081018) % 0xffffff);
    const timer = setInterval(recolor, 200);
    return () => clearInterval(timer);
  });
  return <mark style={{ backgroundColor: colorText }}>{props.children}</mark>;
};

const highlight = [
  {
    component: MultiColor,
    highlight: "blue",
  },
  {
    highlight: /[^ ]*berry/gi,
    component: ToolTip,
    className: "yellow",
  },
];

const ComponentDemo = (props) => {
  return (
    <HighlightWithinTextarea
      highlight={highlight}
      ...
    />
  );
};`;

const ToolTip = (props) => {
  const objects = { contentState: "(...)", children: "(...)" };
  const content = <pre>{JSON.stringify({ ...props, ...objects }, 0, 1)}</pre>;
  return (
    <Tippy content={content}>
      <mark>{props.children}</mark>
    </Tippy>
  );
};

const MultiColor = (props) => {
  const [color, setColor] = useState(0xff8800);
  const colorText = `#${color.toString(16)}`;

  useEffect(() => {
    const recolor = () => setColor(0x808080 | (color + 0x081018) % 0xffffff);
    const timer = setInterval(recolor, 200);
    return () => clearInterval(timer);
  });
  return <mark style={{ backgroundColor: colorText }}>{props.children}</mark>;
};

const highlight = [
  {
    component: MultiColor,
    highlight: "blue",
  },
  {
    highlight: /[^ ]*berry/gi,
    component: ToolTip,
    className: "yellow",
  },
];

const Decorator = () => {
  return (
    <Example
      title={"Custom Object with Decorators Components"}
      text={text}
      initialValue={initialValue}
      highlight={highlight}
      code={code}
    />
  );
};

export default Decorator;
