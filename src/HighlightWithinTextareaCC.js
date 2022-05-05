/*
  * For some reason, exporting a FunctionComponent
  * doesn't work when importing in codepen.io, so wrap
  * it in a class component.
  */
 import * as React from 'react';

 import HighlightWithinTextarea from './HighlightWithinTextarea';

/*
 * For some reason, exporting a FunctionComponent
 * doesn't work when importing in codepen.io, so wrap
 * it in a class component.  This does not support
 * forwardRef.
 */
export class HighlightWithinTextareaCC extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return <HighlightWithinTextareaFunc {...this.props} />;
  }
}
