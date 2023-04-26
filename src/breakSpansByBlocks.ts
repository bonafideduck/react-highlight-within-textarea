import { ContentState } from "draft-js";
import { BlockSpan } from "./types";
import { Find } from "./types";

interface BlockData {
    blockStart: number,
    blockEnd: number,
    blockText: string,
    blockKey: string,
}

const extractBlockData = (contentState: ContentState, text: string): BlockData[] => {
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
      blockKey: block.getKey(),
    });
  }
  return blockData;
};

export const breakSpansByBlocks = (
  contentState: ContentState,
  matches: Find[],
  text: string
): BlockSpan[] => {
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

