import type { FC } from "react";

export type Callback = (start: number, end: number) => void;
export type Strategy = (text: any, callback: Callback) => void;
export type Range = [start: number, end: number];
export type Component = FC<BlockSpan>;
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

export interface BlockSpan {
  text: string;
  blockStart: number;
  blockEnd: number;
  blockText: string;
  blockKey: string;
  spanStart: number;
  spanEnd: number;
  spanText: string;
  component?: Component;
  className?: string;
  matchStart: number;
  matchEnd: number;
  matchText: string;
}

export type FlatStrategy = {
  strategy: Strategy;
  component?: Component;
  className?: string;
};

interface Find {
  component?: Component;
  className?: string;
  matchStart: number;
  matchEnd: number;
  matchText: string;
}
