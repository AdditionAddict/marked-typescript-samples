import { marked } from 'marked';
import { markedMathjax } from '../mathjax/mathjax-options-extension';
import { PrismMarkedOptionsExtensionConfig } from '../prismjs';
import { markedPrism } from '../prismjs/prismjs-options-extension';

export function markedRender(
  content: string,
  prismOptions?: PrismMarkedOptionsExtensionConfig
) {
  // Setting options interferes with other calls to marked
  // https://github.com/markedjs/marked/issues/907
  marked.setOptions(marked.getDefaults());
  marked.setOptions(markedPrism(prismOptions));
  marked.use(markedMathjax());
  return marked(content, { async: true });
}
