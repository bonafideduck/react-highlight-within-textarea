import React from 'react';
import styles from './styles/styles.css';
import getRanges from './getRanges';
import extractSpansOfClasses from './extractSpansOfClasses';

const HighlighedContents = ({value, highlight}) => {
    
    let ranges = getRanges(value, highlight);
    let parts = extractSpansOfClasses(value, ranges);

    return (
        <div>
            <div className={`${styles.highlights} ${styles.content}`} >
                {parts.map(part => part.render())}
             </div>
        </div>
    );       
}

export default HighlighedContents