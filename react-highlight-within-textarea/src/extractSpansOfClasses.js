import React from 'react'
import styles from './styles/styles.css';

class Span {
  constructor(text, beginIndex) {
    this.beginIndex = beginIndex
    this.endIndex = beginIndex + text.length // Like String.slice, it is inclusive.
    this.text = text
    this.fullText = text

    this.isMark = false
    this.ranges = []
    this.markClasses = new Set()
    this.MarkView = this.MarkView.bind(this)
  }

  addRange(range) {
    this.isMark = true
    if (range.className) {
      for (const c of range.className.split(' ')) {
        this.markClasses.add(c)
      }
    }
    this.ranges.push(range)
  }

  carve(beginIndex2) {
    // Carves self to take a bit off the right and returns that carving.
    const rightText = this.text.slice(beginIndex2 - this.beginIndex)
    this.text = this.text.slice(0, beginIndex2 - this.beginIndex)
    this.endIndex = beginIndex2

    const right = new Span(rightText, beginIndex2)
    right.isMark = this.isMark
    right.markClasses = new Set([...this.markClasses])
    right.ranges = [...this.ranges]
    right.fullText = this.fullText

    return right
  }

  get className() {
    if (this.markClasses && this.markClasses.size > 0) {
      return [...this.markClasses].sort().join(' ')
    } else {
      return ''
    }
  }

  EnhancedMarkView(MarkView) {
    const enhancementViews = []
    const enhancedRanges = this.ranges.filter(s => s.enhancements)
    if (enhancedRanges.length === 0) {
      return MarkView;
    }

    const spanProps = {
      className: styles.enhanced,
      text: this.text,
      fullText: this.fullText,
      beginIndex: this.beginIndex,
      endIndex: this.endIndex,
    }

    function wrapMarkView(Enhancement, range, spanProps, MarkView) {
      return React.forwardRef((props, ref) => {
        return <Enhancement {...props} range={range} {...spanProps} MarkView={MarkView} />
      })
    }

    for (const range of enhancedRanges) {
      for (const Enhancement of range.enhancements) {
        MarkView = wrapMarkView(Enhancement, range, spanProps, MarkView);
      }
    }
    return MarkView
  }

  MarkView(props, ref) {
    props = {...props};
    if (props.className) {
      props.className = `${this.className} ${props.className}`;
    } else {
      props.className = this.className;
    }

    return (
      <mark {...props}>{this.text}</mark>
    )
  }

  render() {
    if (this.isMark) {
      const EnhancedMarkView = this.EnhancedMarkView(this.MarkView);
      return (
        <EnhancedMarkView key={this.beginIndex} />
      )
    } else {
      return <span key={this.beginIndex}>{this.text}</span>
    }
  }
}

export default function extractSpansOfClasses(value, ranges) {
  /* Returns value broken into a series of Span classes.  These
   * can be converted to JSX via the render command.
   */

  const spans = [new Span(value, 0)]

  for (const range of ranges) {
    let beginIndex = range[0]
    const endIndex = range[1]

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i]

      // since spans are sorted, So this is always true: beginIndex >= span.beginIndex.
      if (beginIndex < span.endIndex) {
        if (beginIndex === span.beginIndex) {
          if (endIndex < span.endIndex) {
            // [range]
            // [s  p  a  n]
            const span2 = span.carve(endIndex)
            span.addRange(range)
            spans.splice(i + 1, 0, span2)
            beginIndex = endIndex
            i += 1
          } else {
            // [range]   or   [r a n g e]
            // [span-]        [span]
            span.addRange(range)
            beginIndex = span.endIndex
          }
        } else {
          if (endIndex < span.endIndex) {
            //   [range]
            // [s  p  a  n]
            const span2 = span.carve(beginIndex)
            const span3 = span2.carve(endIndex)
            span2.addRange(range)
            spans.splice(i + 1, 0, span2, span3)
            beginIndex = endIndex
            i += 2
          } else {
            //   [range]  or     [range]
            // [s p a n]       [span]
            const span2 = span.carve(beginIndex)
            span2.addRange(range)
            spans.splice(i + 1, 0, span2)
            beginIndex = span2.endIndex
            i += 1
          }
        }
      }
      if (beginIndex === endIndex) {
        break
      }
    }
  }
  return spans
}
