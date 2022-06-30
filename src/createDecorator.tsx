import React from 'react'
import { CompositeDecorator, ContentState, ContentBlock  } from "draft-js";
import { highlightToStrategyAndComponents, StrategyAndComponent, Component, Strategy, Highlight }  from "./highlightToStrategyAndComponents";
interface Find {
  Component: Component,
  matchStart: number,
  matchEnd: number,
  matchText: string,

}
interface BlockSpan {
  block?: ContentBlock,
  spanStart: number,
  spanEnd: number,
  blockStart: number,
  Component?: Component
};

const getMatches = (text: string, strategyAndComponents: StrategyAndComponent[]) => {
  // Calls each strategy to get all matches and then filters out overlaps.
  let finds: Find[] = [];
  for (const sc of strategyAndComponents) {
    const strategy = sc.strategy as Strategy
    strategy(text, (start: number, end: number) => {
      if (start < end && start >= 0 && end <= text.length) {
        finds.push({
          Component: sc.component,
          matchStart: start,
          matchEnd: end,
          matchText: text.slice(start, end),
        });
      }
    });
  }

  let maps = [];

  // Eliminate overlapping finds.
  loop: for (const find of finds) {
    for (let i = find.matchStart; i < find.matchEnd; i++) {
      if (maps[i]) {
        continue loop;
      }
    }
    for (let i = find.matchStart; i < find.matchEnd; i++) {
      maps[i] = find;
    }
  }

  let matches = Array.from(new Set(Object.values(maps))).sort(
    (a, b) => a.matchStart - b.matchStart
  );
  return matches;
};

const extractBlockData = (contentState: ContentState, text: string) => {
  let blocks = contentState.getBlocksAsArray();
  let blockData = [];
  let blockEnd = 0;
  for (const block of blocks) {
    let blockLength = block.getLength();
    if (blockLength == 0) {
      continue;
    }
    let blockText = block.getText();
    let blockStart = text.indexOf(blockText[0], blockEnd);
    blockEnd = blockStart + blockLength;
    blockData.push({
      blockStart: blockStart,
      blockEnd: blockEnd,
      blockText: text.slice(blockStart, blockEnd),
      block: block,
    });
  }
  return blockData;
};

const breakSpansByBlocks = (contentState: ContentState, matches: Find[], text: string) => {
  const blockData = extractBlockData(contentState, text);
  let newSpans = [];
  loop: for (const match of matches) {
    for (const block of blockData) {
      if (block.blockStart >= match.matchEnd) {
        continue loop;
      }
      if (block.blockEnd < match.matchStart) {
        continue;
      }
      const spanStart = Math.max(match.matchStart, block.blockStart);
      const spanEnd = Math.min(match.matchEnd, block.blockEnd);
      const spanText = text.slice(spanStart, spanEnd);

      newSpans.push({
        text: text,
        ...match,
        ...block,
        spanStart: spanStart,
        spanEnd: spanEnd,
        spanText: spanText,
      });
    }
  }
  return newSpans;
};

const blockSpansToDecorators = (blockSpans: BlockSpan[]) => {
  let decorators = [];
  for (const blockSpan of blockSpans) {
    const { block, spanStart, spanEnd, blockStart, Component } = blockSpan;
    const strategy: Strategy = (contentBlock, callback) => {
      if (contentBlock === block) {
        callback(spanStart - blockStart, spanEnd - blockStart);
      }
    };
    delete blockSpan.Component;
    delete blockSpan.block;
    const component = (props: any) => {
      const Cpt = Component as ((props: any) => JSX.Element);
      return <Cpt {...blockSpan} children={props.children} />;
    };
    decorators.push({ strategy: strategy, component: component });
  }
  return decorators;
};

const createDecorator = (contentState: ContentState, highlight: Highlight, text?: string) => {
  text = text || contentState.getPlainText();
  const sc = highlightToStrategyAndComponents(highlight);
  const matches = getMatches(text, sc);
  const blockSpans = breakSpansByBlocks(contentState, matches, text);
  const decorators = blockSpansToDecorators(blockSpans);
  return new CompositeDecorator(decorators);
};

export { createDecorator };
