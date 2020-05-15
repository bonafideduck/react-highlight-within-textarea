import React from 'react'
import { HighlightWithinTextarea }  from 'react-highlight-within-textarea'

const App = () => {
  return (
    <div>
      <HighlightWithinTextarea
        height='240px'
        width='520px'
        customStyles={{ border: '1px solid black' }}
      />
    </div>
  )
}
export default App