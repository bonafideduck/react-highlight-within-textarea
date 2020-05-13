import React from 'react'
import { useMyHook } from 'react-highlight-within-textarea'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App