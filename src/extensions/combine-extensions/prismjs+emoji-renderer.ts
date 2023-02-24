import { marked } from 'marked';
import { EmojiMarkedExtensionOptions } from '../emoji';
import { markedEmoji } from '../emoji/emoji-extension';
import { PrismMarkedOptionsExtensionConfig } from '../prismjs';
import { markedPrism } from '../prismjs/prismjs-options-extension';

export function markedRender(
  content: string,
  emojiOptions: EmojiMarkedExtensionOptions,
  prismOptions?: PrismMarkedOptionsExtensionConfig
) {
  // Setting options interferes with other calls to marked
  // https://github.com/markedjs/marked/issues/907
  marked.setOptions(marked.getDefaults());
  marked.setOptions(markedPrism(prismOptions));
  marked.use(markedEmoji(emojiOptions));
  return marked(content);
}
