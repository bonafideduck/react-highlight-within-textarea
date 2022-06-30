import * as React from "react";

export type Callback = (start: number, end: number) => void;
export type Strategy = (text: any, callback: Callback) => void;
export type Range = [start: number, end: number];
export type Component =
  | Element
  | JSX.Element
  | ((props: any) => Element)
  | ((props: any) => JSX.Element);
export type CustomObject = {
  highlight: Highlight;
  component?: Component;
  className?: string;
};
export type Highlight =
  | string
  | RegExp
  | Strategy
  | CustomObject
  | Range
  | Highlight[];

export type StrategyAndComponent = {
  strategy: Strategy;
  component: Component;
};

export const highlightToStrategyAndComponents = (
  highlight: Highlight,
  classHint?: string,
  componentHint?: Component
): StrategyAndComponent[] => {
  let result: StrategyAndComponent[];

  if (highlight instanceof RegExp) {
    result = [regExpToSAndC(highlight as RegExp, classHint, componentHint)];
  } else if (typeof highlight == "string") {
    result = [stringToSAndC(highlight as string, classHint, componentHint)];
  } else if (typeof highlight == "function") {
    result = [strategyToSAndC(highlight as Strategy, classHint, componentHint)];
  } else if (highlight instanceof Object && "highlight" in highlight) {
    result = customToSAndCs(
      highlight as CustomObject,
      classHint,
      componentHint
    );
  } else if (highlight instanceof Array) {
    if (
      highlight.length === 2 &&
      typeof highlight[0] === "number" &&
      typeof highlight[1] === "number"
    ) {
      result = [rangeToSAndC(highlight as Range, classHint, componentHint)];
    } else {
      result = arrayToSAndCs(
        highlight as Highlight[],
        classHint,
        componentHint
      );
    }
  } else {
    throw new TypeError(`Not a Highlight type: ${highlight}`);
  }
  return result;
};

function arrayToSAndCs(
  highlight: Highlight[],
  className?: string,
  component?: Component
): StrategyAndComponent[] {
  const sAndCs = highlight.map((h) =>
    highlightToStrategyAndComponents(h, className, component)
  );
  return Array.prototype.concat.apply([], sAndCs);
}

function strategyToSAndC(
  strategy: Strategy,
  className?: string,
  component?: Component
): StrategyAndComponent {
  return {
    strategy: strategy,
    component: hwtComponent(className, component),
  };
}

function regExpToSAndC(
  highlight: RegExp,
  className?: string,
  component?: Component
): StrategyAndComponent {
  const regExpStrategy = (text: string, callback: Callback) => {
    let matchArr, start;
    while ((matchArr = highlight.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  };

  return {
    strategy: regExpStrategy,
    component: hwtComponent(className, component),
  };
}

function stringToSAndC(
  highlight: string,
  className?: string,
  component?: Component
): StrategyAndComponent {
  const stringStrategy = (text: string, callback: Callback) => {
    const textLower = text.toLowerCase();
    const strLower = highlight.toLowerCase();
    let index = 0;
    while (((index = textLower.indexOf(strLower, index)), index !== -1)) {
      callback(index, index + strLower.length);
      index += strLower.length;
    }
  };

  return {
    strategy: stringStrategy,
    component: hwtComponent(className, component),
  };
}

function rangeToSAndC(
  highlight: Range,
  className?: string,
  component?: Component
): StrategyAndComponent {
  const rangeStrategy = (text: string, callback: Callback) => {
    const low = Math.max(0, highlight[0]);
    const high = Math.min(highlight[1], text.length);
    if (low < high) {
      callback(low, high);
    }
  };

  return {
    strategy: rangeStrategy,
    component: hwtComponent(className, component),
  };
}

function customToSAndCs(
  highlight: CustomObject,
  className?: string,
  component?: Component
) {
  const hl = highlight.highlight;
  className = 'className' in highlight ? highlight.className : className;
  component = 'component' in highlight ? highlight.component : component;
  return highlightToStrategyAndComponents(hl, className, component);
}

const hwtComponent = (className?: string, Component?: Component): Component => {
  if (Component) {
    const Cmp = Component as (props: any) => JSX.Element;
    return (props: any) => <Cmp className={className} {...props} />;
  } else {
    return (props: any) => <mark className={className}>{props.children}</mark>;
  }
};
