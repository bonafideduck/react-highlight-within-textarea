import React from 'react';
import styles from './styles/styles.css';
import getRanges from './getRanges';
import extractSpansOfClasses from './extractSpansOfClasses';

const HighlighedContents = ({value, highlight}) => {
    
    let ranges = getRanges(value, highlight);
    let parts = extractSpansOfClasses(value, ranges);
    console.log(parts);

    return (
        <div>
            <div className={`${styles.highlights} ${styles.content}`} >
                {value.slice(0,5)}
                <mark>
                    {value.slice(5, 10)}
                </mark>
                {value.slice(10)}     
            </div>
        </div>
    );       
}

export default HighlighedContents