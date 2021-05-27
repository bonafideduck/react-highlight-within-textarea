import React from "react";
import Example from "./Example.js"

const Text = () => {
  return <Example
    title="String"
    text="Note that this is case-insensitive."
    initialValue="Potato potato tomato potato."
    highlightText={'"potato"'}
    highlight="potato"
  />
}

export default Text;
