import React from 'react';
import { CompositeDecorator } from 'draft-js';
import getType from './getType.js';

const highlightToCompositeDecorator = (highlight) => {
  let decorators = highlightToDecorator(
    highlight,
    undefined,
    undefined,
  );
  const compositeDecorator = new CompositeDecorator(decorators);
  return compositeDecorator;
};

const highlightToDecorator = (highlight, className, component) => {
  const type = getType(highlight);

  switch (type) {
    case 'array':
      return arrayToDecorator(highlight, className, component);
    case 'function':
      return functionToDecorator(highlight, className, component);
    case 'regexp':
      return regExpToDecorator(highlight, className, component);
    case 'string':
      return stringToDecorator(highlight, className, component);
    case 'range':
      return rangeToDecorator(highlight, className, component);
    case 'custom':
      return customToDecorator(highlight);
    default:
      if (!highlight) {
        // do nothing for falsey values
      } else {
        console.error('unrecognized highlight type');
      }
      return [];
  }
};

function arrayToDecorator(highlight, className, component) {
  const decorators = highlight.map((h) =>
    highlightToDecorator(h, className, component),
  );
  return Array.prototype.concat.apply([], decorators);
}

function functionToDecorator(highlight, className, component) {
  return [
    {
      strategy: highlight,
      component: hwtComponent(className, component),
    },
  ];
}

function regExpToDecorator(highlight, className, component) {
  const regExpStrategy = (contentBlock, callback, contentState) => {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = highlight.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  };

  return [
    {
      strategy: regExpStrategy,
      component: hwtComponent(className, component),
    },
  ];
}

function stringToDecorator(highlight, className, component) {
  const stringStrategy = (contentBlock, callback, callbackState) => {
    const text = contentBlock.getText();

    const textLower = text.toLowerCase();
    const strLower = highlight.toLowerCase();
    let index = 0;
    while (
      ((index = textLower.indexOf(strLower, index)), index !== -1)
    ) {
      callback(index, index + strLower.length);
      index += strLower.length;
    }
  };

  return [
    {
      strategy: stringStrategy,
      component: hwtComponent(className, component),
    },
  ];
}

function rangeToDecorator(highlight, className, component) {
  const rangeStrategy = (contentBlock, callback, callbackState) => {
    const text = contentBlock.getText();
    const low = highlight[0];
    const high = highlight[1];
    if (low < high && low >= 0 && high < text.length) {
      callback(low, high);
    }
  };

  return [
    {
      strategy: rangeStrategy,
      component: hwtComponent(className, component),
    },
  ];
}

function customToDecorator(highlight) {
  let className = highlight.class;
  let component = highlight.component;
  let hl = highlight.highlight;
  return highlightToDecorator(hl, className, component);
}

const hwtComponent = (className, Component) => {
  if (Component) {
    return (props) => <Component className={className} {...props} />;
  } else {
    return (props) => (
      <mark className={className}>{props.children}</mark>
    );
  }
};

export default highlightToCompositeDecorator;
