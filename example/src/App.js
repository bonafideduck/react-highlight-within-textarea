import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HighlightWithinTextarea }  from './react-highlight-within-textarea'
import NavBar from './NavBar.js'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function ToolTip(props) {
  const content = (
    <div style={{whiteSpace: "pre"}}>
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
      <Tippy content={content} maxWidth="800px">
        <mark style={overlayStyle}></mark>
      </Tippy>
      <props.MarkView />
    </mark>
  )
}


function MultiColor(props) {
  const [color, setColor] = useState(0xff8800);
  const colorText = `#${color.toString(16)}`

  useEffect(() => {
    const timer = setInterval(() => setColor(0x808080 | (color + 0x081018) % 0xFFFFFF), 200)
    return () => clearInterval(timer)
  })
  return <props.MarkView style={{backgroundColor: colorText}} />
}

let data = [[
  "String",
  "Note that this is case-insensitive.",
  "Potato potato tomato potato.",
  `'potato'`,
  'potato'
],[
  "RegExp",
  <span>Don't forget the <code>g</code> (find all) and <code>i</code> (case-insensitive) flags if you need them.</span>,
  "Dog, cat, chicken, goose. Dogs, cats, chickens, geese.",
  `/dogs?|cats?|g(oo|ee)se/gi`,
  /dogs?|cats?|g(oo|ee)se/gi
],[
  "Array of Two Numbers (Range)",
  "An array of exactly two numbers is treated as a range. Highlighting starts at the first character index (inclusive) and ends at the second character index (exclusive).",
  "abcdefgh",
  "[2, 6]",
  [2, 6]
], [
  "Array of Other Things",
  "You can highlight multiple things, using any types mentioned here, with an array.",
  "apple watermelon banana orange mango",
  `[
    'orange',
    /ba(na)*/gi,
    [0, 5]
  ]`,
  [ 'orange', /ba(na)*/gi, [0, 5] ]
], [
  "Function",
  <span>You can use a function for custom logic. It can return any of the types mentioned here. Return anything falsey (<code>false</code>, <code>undefined</code>, etc.) to indicate no highlighting. The current textarea input is provided to it for convenience.</span>,
  "Sun Mon Tue Wed Thu Fri Sat :) <-- remove the smiley...",
   `function getSmileyDayString(input) {
    const dayStrings = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    if (input.indexOf(':)') !== -1) {
        let dayIndex = (new Date()).getDay();
        return dayStrings[dayIndex];
    } else {
        // no smiley, no highlighting
        return false;
    }
  }`,
  function getSmileyDayString(input) {
    const dayStrings = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    if (input.indexOf(':)') !== -1) {
        let dayIndex = (new Date()).getDay();
        return dayStrings[dayIndex];
    } else {
        // no smiley, no highlighting
        return false;
    }
  }
], [
  "Custom Object with Class Name",
  <span>Any type mentioned here can be put in an object wrapper with <code>highlight</code> and <code>className</code> properties. This lets you set CSS classes in the highlight markup for custom styling, such as changing the highlight color.</span>,
  `Here's a blueberry. There's a strawberry. Surprise, it's a banananana!`,
  `[
    {
      highlight: 'strawberry',
      className: 'red'
    },
    {
      highlight: 'blueberry',
      className: 'blue'
    },
    {
      highlight: /ba(na)*/gi,
      className: 'yellow'
    }
  ]`,
  [
    {
      highlight: 'strawberry',
      className: 'red'
    },
    {
      highlight: 'blueberry',
      className: 'blue'
    },
    {
      highlight: /ba(na)*/gi,
      className: 'yellow'
    }
  ],
], [
  "Custom Object with Enhancements (coming soon)",
  <span>
  The div behind the highlighted span can be wrapped in an enhancement.
  This React view receives properties, <code>data</code> which contains 
  information about the particular span and <code>MarkView</code> which 
  is the highlight that contains the text.  If there are
  multiple enhancements, they will wrap around each other.  Also
  note that a single highlight may be broken into two MarkViews if
  it overlaps two highlights.  This effect can be seen below with
  the two pairs of indexes.
  </span>,
  `Here's a blueberry. There's a strawberry.  I'm a little blue because there is a highlight bug where a blueberry's highlight gets split over line breaks in Chrome incorrectly.  This makes me berry sad.
But the blues go away after a newline is forced.`,
  `[
    {
      highlight: 'blue',
      enhancement: MultiColor,
      className: 'blue',
    },
    {
      highlight: /[^ ]*berry/gi,
      enhancement: ToolTip,
      className: 'yellow',
    },
  ]
  
  function ToolTip(props) {
    const content = (
      <div style={{whiteSpace: "pre"}}>
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
        <Tippy content={content} maxWidth="800px">
          <mark style={overlayStyle}></mark>
        </Tippy>
        <props.MarkView />
      </mark>
    )
  }
  
  function MultiColor(props) {
    const [color, setColor] = useState(0xff8800);
    const colorText = \`#\${color.toString(16)}\`
  
    useEffect(() => {
      const timer = setInterval(() => setColor(0x808080 | (color + 0x081018) % 0xFFFFFF), 200)
      return () => clearInterval(timer)
    })
    return <props.MarkView style={{backgroundColor: colorText}} />
  }`,
  [
    {
      highlight: 'blue',
      enhancement: MultiColor,
      className: 'blue',
    },
    {
      highlight: /[^ ]*berry/gi,
      enhancement: ToolTip,
      className: 'yellow',
    },
  ]
]];


const crToBR = (text) => {
  let split = text.split("\n");
  let arr = [];

  for (const index in split) {
    arr.push(<span key={index}>{split[index]}</span>);
    arr.push(<br key={"b" + index} />);
  }
  arr.pop();
  return arr;
}

const Example = ({title, text, initialValue, highlightText, highlight}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Row>
      <Col>
        <h2>{title}</h2>
        <p>{text}</p>
        <HighlightWithinTextarea
          value={value}
          highlight={highlight}
          onChange= {event => setValue(event.target.value)}
          rows="4"
          containerStyle={{width: "100%"}}
          style={{width: "100%"}}
        />
        <pre>
          function Demo() {"{"}<br />
          {"  "}const highlight = {crToBR(highlightText)};<br /><br />
          {"  "}{"return <HighlightWithinTextarea highlight={highlight} />;"}<br />
          {"}"}
        </pre>
      </Col>
  </Row>
  )
}

const App = () => {
  return (
    <div>
    <NavBar />
    <Container style={{maxWidth: 800, border: 20, margin: 'auto'}}>
      <br />
      {
        data.map( (d) =>
          <Example
            key={d[0]}
            title={d[0]}
            text={d[1]}
            initialValue={d[2]}
            highlightText={d[3]}
            highlight={d[4]}
          />
        )
      }
    </Container>
    </div>
  )
}

export default App
