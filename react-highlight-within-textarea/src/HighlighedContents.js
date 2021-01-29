import React from 'react'
import styles from './styles/styles.css'
import getRanges from './getRanges'
import extractSpansOfClasses from './extractSpansOfClasses'
import PropTypes from 'prop-types'

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
  value: PropTypes.string.isRequired,
  highlight: PropTypes.any.isRequired,
}

export default HighlighedContents
