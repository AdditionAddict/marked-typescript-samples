import { marked } from 'marked';
import { PrismMarkedOptionsExtensionConfig } from '..';
import { markedPrism } from './prismjs-options-extension-2';

export function markedRender(
  content: string,
  config?: PrismMarkedOptionsExtensionConfig
) {
  // Setting options interferes with other calls to marked
  // https://github.com/markedjs/marked/issues/907
  marked.setOptions(marked.getDefaults());

  // use prism extension
  const { options, extensions } = markedPrism(config);
  marked.setOptions(options);
  marked.use({ extensions });

  return marked(content);
}
