import React from 'react';
import { ContentBlock, ContentState, CompositeDecorator } from "draft-js";
import { Component, Highlight, BlockSpan, Strategy } from "./types";
import { highlightToFlatStrategy } from "./highlightToFlatStrategy";
import { getMatches } from "./getMatches";
import { breakSpansByBlocks } from "./breakSpansByBlocks";

declare global {
  interface Console {
    profile: (label: string) => void;
    profileEnd: (label: string) => void;
  }
}

type ClassName = string;
type BlockKey = string;
type SpanStart = number;
type ThisMap = Map<
  Component | undefined,
  Map<ClassName | undefined, Map<BlockKey, Map<SpanStart, BlockSpan>>>
>;
type DecoratorCache = Map<
  Function | undefined,
  Map<ClassName | undefined, { component: Function; strategy: Strategy }>
>;

export class DecoratorFactory {
  map: ThisMap;
  decoratorCache: DecoratorCache;

  constructor() {
    this.map = new Map();
    this.decoratorCache = new Map();
  }

  updateBlockSpans(blockSpans: BlockSpan[]) {
    this.map.clear();

    for (const blockSpan of blockSpans) {
      const m = this.map.get(blockSpan.component) || new Map();
      this.map.set(blockSpan.component, m);
      const mm = m.get(blockSpan.className) || new Map();
      m.set(blockSpan.className, mm);
      const mmm = mm.get(blockSpan.blockKey) || new Map();
      mm.set(blockSpan.blockKey, mmm);
      mmm.set(blockSpan.spanStart - blockSpan.blockStart, blockSpan);
    }
  }

  componentFactory(
    component: Component | undefined,
    className: string | undefined
  ) {
    if (component == undefined) {
      return React.memo(
        (props: {
          children?: Array<React.ReactNode>;
          decoratedText: string;
        }) => {
          return (
            <mark className={className}>
              {props.children}
            </mark>
          );
        },
        (a, b) => a.decoratedText == b.decoratedText
      );
    } else {
      return (props: {
        children?: Array<React.ReactNode>;
        blockKey: string;
        start: number;
        end: number;
      }) => {
        const block = this.map
          .get(component)
          ?.get(className)
          ?.get(props.blockKey)
          ?.get(props.start);
        if (!block || !block.component) {
          throw new Error("RHWTAInternalError");
        }
        return <block.component {...block}>{props.children}</block.component>;
      };
    }
  }

  strategyFactory(
    component: Component | undefined,
    className: ClassName | undefined
  ) {
    return (
      block: ContentBlock,
      callback: (start: number, end: number) => void
    ) => {
      const blockSpans =
        this.map
          .get(component)
          ?.get(className)
          ?.get(block.getKey())
          ?.values() || [];
      for (const blockSpan of blockSpans) {
        const start = blockSpan.spanStart - blockSpan.blockStart;
        const end = blockSpan.spanEnd - blockSpan.blockStart;
        callback(start, end);
      }
    };
  }

  toDecorators(blockSpans: BlockSpan[]) {
    const decorators = [];
    this.updateBlockSpans(blockSpans);

    for (const [component, m] of this.map.entries()) {
      for (const [className] of m.entries()) {
        let decorator = this.decoratorCache.get(component)?.get(className);
        if (!decorator) {
          decorator = {
            component: this.componentFactory(component, className),
            strategy: this.strategyFactory(component, className),
          };
          let c = this.decoratorCache.get(component) || new Map();
          this.decoratorCache.set(component, c);
          c.set(className, decorator);
        }
        decorators.push(decorator);
      }
    }
    return decorators;
  }

  create(contentState: ContentState, highlight: Highlight, text?: string) {
    text = text || contentState.getPlainText();

    const sc = highlightToFlatStrategy(highlight);
    const matches = getMatches(text, sc);
    const blockSpans = breakSpansByBlocks(contentState, matches, text);
    const decorators = this.toDecorators(blockSpans);
    const draftDecorators = new CompositeDecorator(decorators);
    return draftDecorators;
  }
}
