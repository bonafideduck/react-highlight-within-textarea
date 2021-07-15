import React from "react";
import { CompositeDecorator } from "draft-js";
import highlightToStrategyAndComponents from "./highlightToStrategyAndComponents.js";

const getMatches = (text, strategyAndComponents) => {
  let finds = [];
  for (const sc of strategyAndComponents) {
    sc.strategy(text, (start, end) => {
      if (start <= end && start >= 0 && end <= text.length) {
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

const extractBlockData = (contentState, text) => {
  let blocks = contentState.getBlocksAsArray();
  let blockData = [];
  let blockEnd = 0;
  let blockNumber = 0;
  for (const block of blocks) {
    let blockLength = block.getLength();
    if (blockLength == 0) {
      continue;
    }
    let blockText = block.getText();
    let blockStart = text.indexOf(blockText[0], blockEnd);
    blockEnd = blockStart + blockLength;
    blockData.push({
      text: text,
      blockText: text.slice(blockStart, blockEnd),
      blockStart: blockStart,
      blockEnd: blockEnd,
      blockLength: blockLength,
      blockNumber: blockNumber,
      block: block,
    });
  }
  return blockData;
};

const breakSpansByBlocks = (contentState, matches, text) => {
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
      const spanStart= Math.max(match.matchStart, block.blockStart)
      const spanEnd= Math.min(match.matchEnd, block.blockEnd)
      const spanText= text.slice(spanStart, spanEnd)

      newSpans.push({
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

const blockSpansToDecorators = (blockSpans) => {
  let decorators = [];
  for (const blockSpan of blockSpans) {
    const { block, spanStart, spanEnd, blockStart, Component } = blockSpan;
    const strategy = (contentBlock, callback, contentState) => {
      if (contentBlock === block) {
        callback(spanStart - blockStart, spanEnd - blockStart);
      }
    };
    delete blockSpan.component;
    delete blockSpan.block;
    const component = (props) => (
      <Component {...blockSpan} children={props.children} />
    );
    decorators.push({ strategy: strategy, component: component });
  }
  return decorators;
};

const createDecorator = (contentState, highlight, text) => {
  const sc = highlightToStrategyAndComponents(highlight);
  const matches = getMatches(text, sc);
  const blockSpans = breakSpansByBlocks(contentState, matches, text);
  const decorators = blockSpansToDecorators(blockSpans);
  return new CompositeDecorator(decorators);
};

export default createDecorator;
