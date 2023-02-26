/**
 * Credit goes to UziTech for original implementation
 * https://github.com/UziTech/marked-katex-extension
 */
import katex, { KatexOptions } from 'katex';
import { marked } from 'marked';

export function markedKatex(options = {}): {
  extensions: marked.TokenizerAndRendererExtension[];
} {
  return {
    extensions: [inlineKatex(options), blockKatex(options)],
  };
}

function inlineKatex(options: KatexOptions | undefined) {
  return {
    name: 'inlineKatex',
    level: 'inline',
    start(src: string) {
      return src.indexOf('$');
    },
    tokenizer(src: string): marked.Tokens.Generic | void {
      const match = src.match(/^\$+([^$\n]+?)\$+/);
      if (match) {
        return {
          type: 'inlineKatex',
          raw: match[0],
          text: match[1].trim(),
        };
      }
    },
    renderer(token: marked.Tokens.Generic) {
      return katex.renderToString(token.text, options);
    },
  };
}

function blockKatex(options: KatexOptions | undefined) {
  return {
    name: 'blockKatex',
    level: 'block',
    start(src: string) {
      return src.indexOf('\n$$');
    },
    tokenizer(src: string): marked.Tokens.Generic | void {
      const match = src.match(/^\$\$+\n([^$]+?)\n\$\$+\n/);
      if (match) {
        return {
          type: 'blockKatex',
          raw: match[0],
          text: match[1].trim(),
        };
      }
    },
    renderer(token: marked.Tokens.Generic) {
      return `<p>${katex.renderToString(token.text, options)}</p>`;
    },
  };
}
