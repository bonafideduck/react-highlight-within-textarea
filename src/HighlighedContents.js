import React from 'react';
import styles from './styles/styles.css';

const HighlighedContents = ({value, highlights}) => {
    return (
        <div className={`${styles.highlights} ${styles.content}`} >
            {value.slice(0,5)}
            <mark>
                {value.slice(5, 10)}
            </mark>
            {value.slice(10)}
        </div> 
    );       
}

export default HighlighedContents