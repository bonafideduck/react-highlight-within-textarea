import React from "react";
import Example from "./Example.js";

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
      
const Text = () => {
  return (
    <>
      <h2>String</h2>
      <span>Note that this is case-insensitive.</span>

      <Example
        initialValue="Potato potato tomato potato."
        highlightText={'"potato"'}
        highlight="potato"
      />
    </>
  );
};

export default Text;
