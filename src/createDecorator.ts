import { ContentState } from "draft-js";
import {
  Highlight,
} from "./types";
import { DecoratorFactory } from "./DecoratorFactory";

const createDecorator = (
  contentState: ContentState,
  highlight: Highlight,
  text?: string
) => {
  console.warn('createDecorator is deprecated.  Use DecoratorFactory().create');
  text = text || contentState.getPlainText();
  const decoratorFactory = new DecoratorFactory();
  return decoratorFactory.create(contentState, highlight, text);
};

export { createDecorator };
