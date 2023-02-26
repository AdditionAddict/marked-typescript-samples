import { KatexOptions } from 'katex';
import { marked } from 'marked';
import { markedKatex } from './katex-extension';

export function markedRender(content: string, options?: KatexOptions) {
  // Setting options interferes with other calls to marked
  // https://github.com/markedjs/marked/issues/907
  marked.setOptions(marked.getDefaults());
  marked.use(markedKatex(options));
  return marked(content);
}
