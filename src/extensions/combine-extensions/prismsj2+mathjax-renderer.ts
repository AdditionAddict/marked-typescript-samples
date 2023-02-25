import { marked } from 'marked';
import { markedMathjax } from '../mathjax/mathjax-options-extension';
import { PrismMarkedOptionsExtensionConfig } from '../prismjs';
import { markedPrism } from '../prismjs/alternative_version/prismjs-options-extension-2';

export function markedRender(
  content: string,
  prismOptions?: PrismMarkedOptionsExtensionConfig
) {
  // Setting options interferes with other calls to marked
  // https://github.com/markedjs/marked/issues/907
  marked.setOptions(marked.getDefaults());
  marked.setOptions(markedPrism(prismOptions).options);
  marked.use({ extensions: markedPrism(prismOptions).extensions });
  marked.use(markedMathjax());
  return marked(content, { async: true });
}
