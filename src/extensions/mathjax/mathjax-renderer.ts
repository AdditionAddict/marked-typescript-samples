import { marked } from 'marked';
import { markedMathjax } from './mathjax-options-extension';

export function markedRender(content: string) {
  // Setting options interferes with other calls to marked
  // https://github.com/markedjs/marked/issues/907
  marked.setOptions(marked.getDefaults());
  marked.use(markedMathjax());
  return marked(content, { async: true });
}
