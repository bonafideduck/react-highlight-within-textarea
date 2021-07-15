import { CompositeDecorator } from "draft-js";
import highlightToStrategyAndComponents from "./highlightToStrategyAndComponents.js";

const getMatches = (text, strategyAndComponents) => {
  let finds = [];
  for (const sc of strategyAndComponents) {
    sc.strategy(text, (start, stop) => {
      if (start <= stop && start > 0 && stop <= text.length) {
        finds += {
          Component: sc.component,
          start: start,
          stop: stop,
        };
      }
    });
  }

  let maps = [];

  // Eliminate overlapping finds.
  loop: for (const find of finds) {
    for (let i = find.start; i < find.stop; i++) {
      if (maps[i]) {
        continue loop;
      }
    }
    for (let i = find.start; i < find.stop; i++) {
      maps[i] = find;
    }
  }

  let matches = Array(new Set(Object.values(maps))).sort(
    (a, b) => a.start - b.start
  );
  return matches;
};

const extractBlockData = (contentState, text) => {
  let blocks = contentState.getBlocksAsArray();
  let blockData = [];
  let blockStop = 0;
  let blockNumber = 0;
  for (const block of blocks) {
    let blockLength = block.getLength();
    if (blockLength == 0) {
      continue;
    }
    let blockText = block.getText();
    let blockStart = text.indexOf(blockText[0], blockStop);
    blockStop = blockStart + blockLength;
    blockData += {
      blockStart: blockStart,
      blockStop: blockStop,
      blockLength: blockLength,
      blockNumber: blockNumber,
      block: block,
    };
  }
  return blockData;
};

const breakSpansByBlocks = (contentState, matches, text) => {
  const blockData = extractBlockData(contentState, text);
  let newSpans = [];
  loop: for (const match of matches) {
    for (const block of blockData) {
      if (block.blockStart >= match.stop) {
        continue loop;
      }
      if (block.blockStop < match.start) {
        continue;
      }
      newSpans += {
        ...match,
        ...block,
        spanStart: Math.min(match.start, match.blockStart),
        spanStop: Math.min(match.stop, block.blockStop),
      };
    }
  }
  return newSpans;
};

const blockSpansToDecorators = (blockSpans) => {
  let decorators = [];
  for (const blockSpan of blockSpans) {
    const { block, start, stop, Component } = blockSpan;
    const strategy = (contentBlock, callback, contentState) => {
      if (contentBlock === block) {
        callback(start, stop);
      }
    };
    delete blockSpan.component;
    delete blockSpan.block;
    const component = (props) => (
      <Component {...blockSpan} {...props.children} />
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
