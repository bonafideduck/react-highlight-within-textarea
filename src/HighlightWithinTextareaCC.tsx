/*
 * For some reason, exporting a FunctionComponent
 * doesn't work when importing in codepen.io, so wrap
 * it in a class component.
 */
import * as React from 'react';

import HighlightWithinTextarea from './HighlightWithinTextarea';
import { HWTAProps } from './HighlightWithinTextarea';
import { Editor } from "draft-js";

interface CCProps extends HWTAProps {
  forwardRef?: Editor
}
export class HighlightWithinTextareaCC extends React.Component<CCProps, {}> {
  constructor(props: CCProps) {
    super(props);
  }

  render() {
    return <HighlightWithinTextarea { ...this.props } />;
  }
}
