import React, { useState, useEffect } from 'react';
import Example from "./Example.js";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

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

const code = `TBD`;
//   `Here's a blueberry. There's a strawberry.  I'm a little blue because there is a highlight bug where a blueberry's highlight gets split over line breaks in Chrome incorrectly.  This makes me berry sad.
// But the blues go away after a newline is forced.`,
//   `[
//     {
//       highlight: 'blue',
//       enhancement: MultiColor,
//       className: 'blue',
//     },
//     {
//       highlight: /[^ ]*berry/gi,
//       enhancement: ToolTip,
//       className: 'yellow',
//     },
//   ]

//   function ToolTip(props) {
//     const content = (
//       < style={{
//         whiteSpace: "pre",
//         overflow: "hidden",
//         textOverflow: "ellipsis"
//       }}>
//         {JSON.stringify(props.data, 0, 1)}
//       </>
//     )
//     const overlayStyle = {
//       position: "absolute",
//       height: "50%",
//       width: "100%",
//       background: "transparent",
//       zIndex: 1,
//     }

//     return (
//       <mark style={{position: "relative"}}>
//         <Tippy content={content} maxWidth="400px">
//           <mark style={overlayStyle}></mark>
//         </Tippy>
//         <props.MarkView />
//       </mark>
//     )
//   }

//   function MultiColor(props) {
//     const [color, setColor] = useState(0xff8800);
//     const colorText = \`#\${color.toString(16)}\`

//     useEffect(() => {
//       const timer = setInterval(() => setColor(0x808080 | (color + 0x081018) % 0xFFFFFF), 200)
//       return () => clearInterval(timer)
//     })
//     return <props.MarkView style={{backgroundColor: colorText}} />
//   }`,
//   [
//     {
//       highlight: 'blue',
//       enhancement: MultiColor,
//       className: 'blue',
//     },
//     {
//       highlight: /[^ ]*berry/gi,
//       enhancement: ToolTip,
//       className: 'yellow',
//     },
//   ]
//   ],
// ];


function ToolTip(props) {
  const content = (
    <div style={{
      whiteSpace: "pre",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }}>
      {JSON.stringify(props.data, 0, 1)}
    </div>
  )
  const overlayStyle = {
    position: "absolute",
    height: "50%",
    width: "100%",
    background: "transparent",
    zIndex: 1,
  }

  return (
    <mark style={{position: "relative"}}>
      <Tippy content={content} maxWidth="400px">
        <mark style={overlayStyle}></mark>
      </Tippy>
      <props.MarkView />
    </mark>
  )
}

const MultiColor = (props) => {
  const [color, setColor] = useState(0xff8800);
  const colorText = `#${color.toString(16)}`

  useEffect(() => {
    const timer = setInterval(() => setColor(0x808080 | (color + 0x081018) % 0xFFFFFF), 200)
    return () => clearInterval(timer)
  })
  return (
    <mark {...props} style={{backgroundColor: colorText}}>
      {props.children}
    </mark>
  );
  return <props.MarkView style={{backgroundColor: colorText}} />
}


const initialValue = `Here's a blueberry. There's a strawberry.  I'm a little blue because there is a highlight bug where a blueberry's highlight gets split over line breaks in Chrome incorrectly.  This makes me berry sad.
But the blues go away after a newline is forced.`;

const highlight = [{
  component: MultiColor,
  highlight: "blue",
}];

const Decorator = () => {
  return (
    <Example
      title={"Custom Object with Decorators"}
      text={text}
      initialValue={initialValue}
      highlight={highlight}
      code={code}
    />
  );
};

export default Decorator;
