import * as React from 'react'
import getType from "./getType";

export type Callback = (start: number, end: number) => void;
export type Strategy = (text: any, callback: Callback) => void;
export type Range = [start: number, end: number];
export type Component = Element | JSX.Element | ((props: any) => Element) | ((props: any) => JSX.Element);

export interface StrategyAndComponent {
  component: Component,
  strategy: Strategy | Highlight,
  className?: string
}

export type Custom = { component: JSX.Element, highlight: Highlight, className: string };
export type Highlight = string | Custom | Highlight[] | RegExp | Range;

export const highlightToStrategyAndComponents = (highlight: Highlight, className?: string, component?: Component): StrategyAndComponent[] => {
  const type = getType(highlight);

  switch (type) {
    case "array":
      return arrayToDecorator(highlight as Highlight[], className, component);
    case "strategy":
      return strategyToDecorator(highlight, className, component);
    case "regexp":
      return regExpToDecorator(highlight as RegExp, className, component);
    case "string":
      return stringToDecorator(highlight as string, className, component);
    case "range":
      return rangeToDecorator(highlight as Range, className, component);
    case "custom":
      return customToDecorator(highlight as Custom);
    default:
      if (!highlight) {
        // do nothing for falsey values
      } else {
        console.error("unrecognized highlight type");
      }
      return [];
  }
};

function arrayToDecorator(highlight: Highlight[], className: string, component: Component) {
  const decorators = highlight.map((h) =>
    highlightToStrategyAndComponents(h, className, component)
  );
  return Array.prototype.concat.apply([], decorators);
}

function strategyToDecorator(highlight: Highlight, className: string, component: Component) {
  return [
    {
      strategy: highlight,
      component: hwtComponent(className, component),
    },
  ];
}

function regExpToDecorator(highlight: RegExp, className: string, component: Component) {
  const regExpStrategy = (text: string, callback: Callback) => {
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

function stringToDecorator(highlight: string, className: string, component: Component) {
  const stringStrategy = (text: string, callback: Callback) => {
    const textLower = text.toLowerCase();
    const strLower = highlight.toLowerCase();
    let index = 0;
    while (((index = textLower.indexOf(strLower, index)), index !== -1)) {
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

function rangeToDecorator(highlight: Range, className: string, component: Component) {
  const rangeStrategy = (text: string, callback: Callback) => {
    const low = Math.max(0, highlight[0]);
    const high = Math.min(highlight[1], text.length);
    if (low < high) {
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

function customToDecorator(highlight: Custom) {
  let className = highlight.className;
  let component = highlight.component;
  let hl = highlight.highlight;
  return highlightToStrategyAndComponents(hl, className, component);
}

const hwtComponent = (className: string, Component: Component) => {
  if (Component) {
    const Cmp = Component as ((props: any) => JSX.Element)
    return (props: any) => <Cmp className={className} {...props} />;
  } else {
    return (props: any) => <mark className={className}>{props.children}</mark>;
  }
};