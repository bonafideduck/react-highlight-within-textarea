import React, { useState } from 'react';
import styles from './styles/styles.css';
import HighlighedContents from './HighlighedContents';

export const HighlightWithinTextarea = ({value, onChange, highlight={}, className = "",  style={}, containerStyle={}, containerClassName="", ...textAreaProps}) => {
  let containerProps = {}
  const textAreaClassName = `${styles.input} ${styles.content}`;

  className = `${styles.input} ${styles.content} ${className}`;
  containerClassName = `${styles.container} ${containerClassName}`;

  // To properly work, value and onChange must be supplied.  Give a hint for new users.
  const [fakeValue, setFakeValue] = useState("Please supply a value and an onChange parameter.");
  if (value == undefined) {
    value = fakeValue;
    onChange = event => {setFakeValue(event.target.value)};
  }
  
  const handleScroll = event => { console.log('handleScroll')};
  const blockContainerScroll = event => { console.log('blockContainerScroll')};

  return (
    <div className={containerClassName} style={containerStyle} onScroll={blockContainerScroll} >
      <div className={styles.backdrop} >
        <HighlighedContents value={value} highlight={highlight}>
        </HighlighedContents>
      </div>
      <textarea value={value} onChange={onChange} style={style} className={className} {...textAreaProps} onScroll={handleScroll} >
      </textarea>
    </div>
  );
}
