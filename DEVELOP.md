# Development Process

## Localhost Server

```
yarn start
```

## Build and Test

no testing is yet supported

## Publish New Demo

```
yarn publish-pages
```
* Manually edit each CodeSandbox ReactHighlightWithinTextarea version.

## Update the dependencies

```
rm yarn.lock demo/yarn.lock
npx npm-check-updates -u --dep dev && yarn
(cd demo && npx npm-check-updates -u && yarn)
```

## Publish Update

In a branch off of main, do the following:

```sh
checkout main
yarn upgrade --latest
vi HISTORY.md
git commit
yarn build
yarn publish --bug # --minor --major --new-version # --tag alpha # for prerelease
git push --follow-tags

checkout release-3.x.x
git merge origin/main
git push
```

* Merge this publish branch into release on github using 
[this link](https://github.com/bonafideduck/react-highlight-within-textarea/pull/new/develop)


# Code Notes

## createDecorator

### highlightToFlatStrategy

Takes the highlights and breaks it down into a list of strategy 
and components.  Returns FlatStrategy[].

```
export type FlatStrategy = {
  strategy: Strategy;
  component?: Component;
  className?: string;
};
```

### getMatches

Takes text and the strategy/component highlights and returns 
a nonoverlapping array of matched spans. Returns Finds[];
```
interface Find {
  component?: Component;
  className?: string;
  matchStart: number;
  matchEnd: number;
  matchText: string;
}
```

### breakSpansByBlocks

Breaks anything flowing over a newline and splits it over the newlines.
Returns BlockSpan[].

```
export interface BlockSpan {
  text: string,
  blockStart: number,
  blockEnd: number,
  blockText: string,
  blockKey: string,
  spanStart: number;
  spanEnd: number;
  spanText: string,
  component?: Component;
  className?: string;
  matchStart: number;
  matchEnd: number;
  matchText: string;
}
```

### blockSpansToDecorators

Changes every single match into a Decorator.  Blockspans with the
same `component` and `classname` and strategy will be placed in 
the same decorator.  If a component is not specified, it will
be created. The props pased to the component (if supplied)
will be BlockSpan (todo: move this to an exported type?);
Returns something like this:

```
{
  strategy: (contentBlock, callback) => void;
  component: (props: BlockSpan) => ReactElement;
}[];
```

### CompositeDecorator

draft-js function that takes the above decorator
