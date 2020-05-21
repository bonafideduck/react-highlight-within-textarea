import React, { useState } from 'react';
import styles from './styles/styles.css';
import getRanges from './getRanges';

export const HighlightWithinTextarea = (props) => {
  let newProps = {...props};
  let highlight = props.highlight || {};
  delete newProps.highlight;

  newProps.className = `${styles.input} ${styles.content}`;
  if (props.className) {
    newProps.className += ` ${props.className}`;
  }

  // To properly work, value and onChange must be supplied.  Give a hint for new users.
  const [fakeValue, setFakeValue] = useState("Please supply a value and an onChange parameter.");
  if (props.value == undefined) {
    newProps.value = fakeValue;
    newProps.onChange = event => {setFakeValue(event.target.value)};
  }
  
  const handleScroll = event => { console.log('handleScroll')};
  const blockContainerScroll = event => { console.log('blockContainerScroll')};
  const ranges = getRanges(newProps.input, newProps.highlight);

  return (
    <div className={styles.container} onScroll={blockContainerScroll}>
      <div className={styles.backdrop} >
        <div className={`${styles.highlights} ${styles.content}`} >
        </div>
      </div>
      <textarea {...newProps} onScroll={handleScroll} >
      </textarea>
    </div>
  );
}
