import React from "react";
import Example from "./Example.js";

const text = (
  <span>
    Any type mentioned here can be put in an object wrapper with{" "}
    <code>highlight</code> and <code>className</code> properties. This lets you
    set CSS classes in the highlight markup for custom styling, such as changing
    the highlight color.
  </span>
);

const code = `<HighlightWithinTextarea
  highlight={[
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
  ]}
  ...
/>`;

const highlight = [
  {
    highlight: "strawberry",
    className: "red",
  },
  {
    highlight: "blueberry",
    className: "blue",
  },
  {
    highlight: /ba(na)*/gi,
    className: "yellow",
  },
];
// ], [

const Text = () => {
  return (
    <Example
      title="Custom Object with Class Name"
      text={text}
      initialValue="Here's a blueberry. There's a strawberry. Surprise, it's a banananana!"
      highlight={highlight}
      code={code}
      codeSandbox="rhwta-customobject-plw96"
    />
  );
};

export default Text;
