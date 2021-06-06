//import React, { useState, useEffect } from 'react';
import React from "react";
import Container from "react-bootstrap/Container";
import NavBar from "./NavBar.js";
import Example from "./Example.js";
import String from "./String.js";
import Regexp from "./Regexp.js";
import Range from "./Range.js";
import Array from "./Array.js";
import Strategy from "./Strategy.js";
import CustomObject from "./CustomObject.js";
import Decorator from "./Decorator.js";
import "./App.css";

//import Tippy from '@tippyjs/react';
//import 'tippy.js/dist/tippy.css';

// function ToolTip(props) {
//   const content = (
//     <div style={{
//       whiteSpace: "pre",
//       overflow: "hidden",
//       textOverflow: "ellipsis"
//     }}>
//       {JSON.stringify(props.data, 0, 1)}
//     </div>
//   )
//   const overlayStyle = {
//     position: "absolute",
//     height: "50%",
//     width: "100%",
//     background: "transparent",
//     zIndex: 1,
//   }

//   return (
//     <mark style={{position: "relative"}}>
//       <Tippy content={content} maxWidth="400px">
//         <mark style={overlayStyle}></mark>
//       </Tippy>
//       <props.MarkView />
//     </mark>
//   )
// }

// function MultiColor(props) {
//   const [color, setColor] = useState(0xff8800);
//   const colorText = `#${color.toString(16)}`

//   useEffect(() => {
//     const timer = setInterval(() => setColor(0x808080 | (color + 0x081018) % 0xFFFFFF), 200)
//     return () => clearInterval(timer)
//   })
//   return <props.MarkView style={{backgroundColor: colorText}} />
// }

// let data = [

//     ["orange", /ba(na)*/gi, [0, 5]],
// ], [
//   "Function",
//   <span>You can use a function for custom logic. It can return any of the types mentioned here. Return anything falsey (<code>false</code>, <code>undefined</code>, etc.) to indicate no highlighting. The current textarea input is provided to it for convenience.</span>,
//   "Sun Mon Tue Wed Thu Fri Sat :) <-- remove the smiley...",
//    `function getSmileyDayString(input) {
//     const dayStrings = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
//     if (input.indexOf(':)') !== -1) {
//         let dayIndex = (new Date()).getDay();
//         return dayStrings[dayIndex];
//     } else {
//         // no smiley, no highlighting
//         return false;
//     }
//   }`,
//   function getSmileyDayString(input) {
//     const dayStrings = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
//     if (input.indexOf(':)') !== -1) {
//         let dayIndex = (new Date()).getDay();
//         return dayStrings[dayIndex];
//     } else {
//         // no smiley, no highlighting
//         return false;
//     }
//   }
// ], [
//   "Custom Object with Class Name",
//   <span>Any type mentioned here can be put in an object wrapper with <code>highlight</code> and <code>className</code> properties. This lets you set CSS classes in the highlight markup for custom styling, such as changing the highlight color.</span>,
//   `Here's a blueberry. There's a strawberry. Surprise, it's a banananana!`,
//   `[
//     {
//       highlight: 'strawberry',
//       className: 'red'
//     },
//     {
//       highlight: 'blueberry',
//       className: 'blue'
//     },
//     {
//       highlight: /ba(na)*/gi,
//       className: 'yellow'
//     }
//   ]`,
//   [
//     {
//       highlight: 'strawberry',
//       className: 'red'
//     },
//     {
//       highlight: 'blueberry',
//       className: 'blue'
//     },
//     {
//       highlight: /ba(na)*/gi,
//       className: 'yellow'
//     }
//   ],
// ], [
//   "Custom Object with Enhancements",
//   <span>
//   The div behind the highlighted span can be wrapped in an enhancement.
//   This React view receives properties, <code>data</code> which contains
//   information about the particular span and <code>MarkView</code> which
//   is the highlight that contains the text.  If there are
//   multiple enhancements, they will wrap around each other.  Also
//   note that a single highlight may be broken into two MarkViews if
//   it overlaps two highlights.  This effect can be seen below with
//   the two pairs of indexes.
//   </span>,
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

const App = () => {
  return (
    <div style={{ background: "gray" }}>
      <Container
        style={{
          background: "white",
          maxWidth: 800,
          padding: 20,
          border: "solid 20px gray",
          margin: "auto",
        }}
      >
        <NavBar />
        <br />
        <String />
        <Regexp />
        <Range />
        <Array />
        <Strategy />
        <CustomObject />
        <Decorator />
      </Container>
    </div>
  );
};

export default App;
