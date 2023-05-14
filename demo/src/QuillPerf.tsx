import { useRef, useState, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const style = {
  margin: 8,
  border: "solid 1pt black",
  overflow: "scroll",
  textAlign: "left" as const,
};

const options = {
  placeholder: "Compose an epic...",
  theme: "snow",
};

function quillRangeDecorator(q: Quill, delta: unknown) {
  const { ops } = delta as { ops: { insert?: string }[] };

  if (!ops.find((op) => op.insert)) {
    return;
  }

  const text = q.getText();

  q.removeFormat(0, text.length - 1);

  let bold = true;
  for (let start = 0; start < text.length; start += 1) {
    if (text[start] !== " ") {
      let end = start + 1;
      while (end < text.length && text[end] !== " ") {
        end += 1;
      }
      q.formatText(start, end - start, bold ? "bold" : "italic", true);
      bold = !bold;
      start = end;
    }
  }
}

function QuillPerf() {
  const quill = useRef<Quill | null>(null);
  const quillParent = useRef<HTMLDivElement>(null);
  const [delta, setDelta] = useState({});
  const [prevDelta, setPrevDelta] = useState({});
  const [checked, setChecked] = useState(true);
  const [calls, setCalls] = useState(0);

  useEffect(() => {
    if (quillParent.current && !quill.current) {
      const initialText = String("Potato potato tomato potato. ").repeat(500);
      quillParent.current.textContent = initialText;
      const q = new Quill(quillParent.current, options);
      quillRangeDecorator(q, { ops: [{ insert: 1 }] });
      quill.current = q;
      q.on("text-change", (delta, prevDelta) => {
        if (checked) {
          quillRangeDecorator(q, delta);
        }
        setDelta(delta);
        setPrevDelta(prevDelta);
        setCalls(calls + 1);
      });
    }
  });

  return (
    <div className="App">
      <h1>HighlightWithinTextarea</h1>
      <h2>Raw Quill Performance (Ranges)</h2>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />{" "}
        Enable decorating.
      </label>
      <div>Calls: {calls}</div>
      <div style={style} ref={quillParent}>
        Loading
      </div>
      {checked && (
        <div>
          <div>Delta:</div>
          <pre>{JSON.stringify(delta, null, 2)}</pre>
          <div>PrevDelta:</div>
          <pre>{JSON.stringify(prevDelta, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export { QuillPerf };
