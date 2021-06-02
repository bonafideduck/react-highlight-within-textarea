import React, {Component} from 'react'
import {render} from 'react-dom'

import HighlightWithinTextarea from '../../src'

export default class Demo extends Component {
  render() {
    return <div>
      <h1>react-highlight-within-textarea Demo</h1>
      <HighlightWithinTextarea value="bubba" highlight="bb"/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
