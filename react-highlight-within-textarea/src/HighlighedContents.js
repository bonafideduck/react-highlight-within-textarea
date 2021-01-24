import React from 'react'
import styles from './styles/styles.css'
import getRanges from './getRanges'
import extractSpansOfClasses from './extractSpansOfClasses'

const HighlighedContents = ({ value, highlight }) => {
  const ranges = getRanges(value, highlight)
  const parts = extractSpansOfClasses(value, ranges)

  return (
    <div>
      <div className={`${styles.highlights} ${styles.content}`}>
        {parts.map(part => part.render())}
      </div>
    </div>
  )
}

HighlighedContents.propTypes = {
  value: React.PropTypes.string.isRequired,
  highlight: React.PropTypes.any.isRequired,
}

export default HighlighedContents
