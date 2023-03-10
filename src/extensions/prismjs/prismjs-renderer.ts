import { marked } from 'marked';
import { PrismMarkedOptionsExtensionConfig } from '.';
import { markedPrism } from './prismjs-options-extension';

export function markedRender(
  content: string,
  config?: PrismMarkedOptionsExtensionConfig
) {
  // Setting options interferes with other calls to marked
  // https://github.com/markedjs/marked/issues/907
  marked.setOptions(marked.getDefaults());
  marked.setOptions(markedPrism(config));
  return marked(content);
}
