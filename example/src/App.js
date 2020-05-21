import React, { useState } from 'react';
import { HighlightWithinTextarea }  from 'react-highlight-within-textarea'

const App = () => {

  return (
    <div>
      <Example
        title="String"
        text="Note that this is case-insensitive."
        initialValue="Potato potato tomato potato."
        highlight= '"potato"'
      />
    </div>
  )
}

const Example = ({title, text, initialValue, highlight}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div>
      <h2>{title}</h2>
      <p>{text}</p>
      <HighlightWithinTextarea
        value={value}
        highlight={JSON.parse(highlight)}
        onChange= {event => setValue(event.target.value)}
        cols="40"
        rows="4"
      />
    </div>
  )
}

export default App
