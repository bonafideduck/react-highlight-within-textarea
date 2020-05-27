import React, { useState } from 'react';
import { HighlightWithinTextarea }  from 'react-highlight-within-textarea'

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
  "Custom Object (with Class Name)",
  <span>Any type mentioned here can be put in an object wrapper with <code>highlight</code> and <code>className</code> properties. This lets you set CSS classes in the highlight markup for custom styling, such as changing the highlight color.</span>,
  `Here's a blueberry. There's a strawberry. Surprise, it's a banananana! <h1>hello</h1>`,
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
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
      <HighlightWithinTextarea
        value={value}
        highlight={highlight}
        onChange= {event => setValue(event.target.value)}
        cols="50"
        rows="4"
      />
      <pre>
        function Demo() {"{"}<br />
        {"  "}const highlight = {crToBR(highlightText)};<br /><br />
        {"  "}{"return <HighlightWithinTextarea highlight={highlight} />;"}<br />
        {"}"}
      </pre>
  </div>
  )
}

const App = () => {
  return (
    <div>
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
    </div>
  )
}

export default App
