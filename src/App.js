import './App.css';
import { useState } from 'react';
import HighlightWithinTextArea from './components/HighlightWithinTextarea'

function App() {
  const [value, setValue] = useState("The movie Bubba Gump was sad and happy");
  const onChange = (value) => setValue(value);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <HighlightWithinTextArea highlight="bubba" value={value} onChange={onChange} />
        </p>
      </header>
    </div>
  );
}

export default App;
