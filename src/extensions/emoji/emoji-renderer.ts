import { marked } from 'marked';
import { EmojiMarkedExtensionOptions } from '.';
import { markedEmoji } from './emoji-extension';

export function markedRender(
  content: string,
  options: EmojiMarkedExtensionOptions
) {
  // Setting options interferes with other calls to marked
  // https://github.com/markedjs/marked/issues/907
  marked.setOptions(marked.getDefaults());
  marked.use(markedEmoji(options));
  return marked(content);
}
