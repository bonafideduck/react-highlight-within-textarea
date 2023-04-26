import {
  Highlight,
  Strategy,
  Callback,
  FlatStrategy,
  CustomObject,
  Range,
  Component
} from "./types";

export const highlightToFlatStrategy = (
  highlight: Highlight,
  classHint?: string,
  componentHint?: Component
): FlatStrategy[] => {
  let result: FlatStrategy[];

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
): FlatStrategy[] {
  const sAndCs = highlight.map((h) =>
    highlightToFlatStrategy(h, className, component)
  );
  return Array.prototype.concat.apply([], sAndCs);
}

function strategyToSAndC(
  strategy: Strategy,
  className?: string,
  component?: Component
): FlatStrategy {
  return {
    strategy,
    component,
    className,
  };
}

function regExpToSAndC(
  highlight: RegExp,
  className?: string,
  component?: Component
): FlatStrategy {
  const regExpStrategy = (text: string, callback: Callback) => {
    let matchArr, start;
    while ((matchArr = highlight.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  };

  return {
    strategy: regExpStrategy,
    className,
    component: component,
  };
}

function stringToSAndC(
  highlight: string,
  className?: string,
  component?: Component
): FlatStrategy {
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
    component,
    className,
  };
}

function rangeToSAndC(
  highlight: Range,
  className?: string,
  component?: Component
): FlatStrategy {
  const rangeStrategy = (text: string, callback: Callback) => {
    const low = Math.max(0, highlight[0]);
    const high = Math.min(highlight[1], text.length);
    if (low < high) {
      callback(low, high);
    }
  };

  return {
    strategy: rangeStrategy,
    component,
    className,
  };
}

function customToSAndCs(
  highlight: CustomObject,
  className?: string,
  component?: Component
) {
  const hl = highlight.highlight;
  className = "className" in highlight ? highlight.className : className;
  component = "component" in highlight ? highlight.component : component;
  return highlightToFlatStrategy(hl, className, component);
}
