import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import expect from 'expect'

import HighlightWithinTextarea from 'src/'

describe('HighlightWithinTextarea', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    render(<HighlightWithinTextarea value="Welcome to React components"></HighlightWithinTextarea>, node, () => {
      expect(node.innerHTML).toContain('Welcome to React components')
    })
  })
})
