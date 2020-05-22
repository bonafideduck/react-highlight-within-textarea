import React, { useState } from 'react';
import { HighlightWithinTextarea }  from 'react-highlight-within-textarea'

let data = [[
  "String",
  "Note that this is case-insensitive.",
  "Potato potato tomato potato.",
  `'potato'`,
  'potato',
  false
],[
  "RegExp",
  <span>Don't forget the <code>g</code> (find all) and <code>i</code> (case-insensitive) flags if you need them.</span>,
  "Dog, cat, chicken, goose. Dogs, cats, chickens, geese.",
  `/dogs?|cats?|g(oo|ee)se/gi`,
  /dogs?|cats?|g(oo|ee)se/gi
]];

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

const crToBR = (text) => {
  let split = text.split("\n");
  let arr = [split.shift()];

  for (const item of split) {
    arr.push(<br />);
    arr.push(item);
  }
  console.log(arr);
  return arr;
}

const Example = ({title, text, initialValue, highlightText, highlight}) => {
  const [value, setValue] = useState(initialValue);
  console.log(highlightText);

  return (
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
      <HighlightWithinTextarea
        value={value}
        highlight={highlight}
        onChange= {event => setValue(event.target.value)}
        cols="40"
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

export default App
