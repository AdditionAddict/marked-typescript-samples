/**
 * Credit to UziTech
 * See https://github.com/UziTech/marked-emoji
 *
 * This copy adds typescript
 */
import { marked } from 'marked';
import { EmojiMarkedExtensionOptions } from '.';

interface EmojiToken {
  type: 'emoji';
  raw: string;
  name: string;
  emoji: string;
}

export function markedEmoji(options: EmojiMarkedExtensionOptions): {
  extensions: Array<marked.TokenizerAndRendererExtension>;
} {
  options = {
    emojis: options.emojis,
    unicode: options.unicode ?? false,
  };

  return {
    extensions: [
      {
        name: 'emoji',
        level: 'inline',
        start(src: string) {
          return src.indexOf(':');
        },
        tokenizer(src: string): EmojiToken | void {
          const rule = /^:(.+?):/;
          const match = rule.exec(src);
          if (!match) {
            return;
          }

          const name = match[1];
          const emoji = options.emojis[name];

          if (!emoji) {
            return;
          }

          return {
            type: 'emoji',
            raw: match[0],
            name,
            emoji,
          };
        },
        renderer(token: marked.Tokens.Generic): string {
          if (options.unicode) {
            return token.emoji;
          } else {
            return `<img alt="${token.name}" src="${token.emoji}"${
              this.parser.options.xhtml ? ' /' : ''
            }>`;
          }
        },
      },
    ],
  };
}
