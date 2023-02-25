/**
 * Credit goes to Scully for original implementation
 * https://github.com/scullyio/scully/blob/main/libs/scully/src/lib/fileHanderPlugins/markdown.ts
 */
import { marked } from 'marked';

import 'prismjs';
import 'prismjs/components/prism-typescript';
import { PrismMarkedOptionsExtensionConfig } from '..';
import { createRendererExtension } from './create-renderer-extension';

declare const Prism: typeof import('prismjs');

export const warningLanguageNotAvailable = (lang: string) => `Notice:
---------------------------------------------------------------------------------------
  The requested language '${lang}' is not available with the provided setup.
  To enable, import your main.ts as:
    import 'prismjs/components/prism-${lang}';
---------------------------------------------------------------------------------------
`;

// type guard
function isCodeToken(token: marked.Token): token is marked.Tokens.Code {
  return token.type === 'code';
}

export function markedPrism(config?: PrismMarkedOptionsExtensionConfig): {
  options: marked.MarkedOptions;
  extensions: marked.TokenizerAndRendererExtension[];
} {
  // only warn about missing Prism language once
  const languageWarnings = new Set<string>();

  const { rendererExtension } = createRendererExtension();

  function highlight(code: string, lang: string) {
    // check if Prism language is supported
    if (!Prism.languages[lang]) {
      // warn only once, if warnings not suppressed
      if (!config?.suppressWarning && !languageWarnings.has(lang)) {
        console.warn(warningLanguageNotAvailable(lang));
        languageWarnings.add(lang);
      }

      // return unhighlighted code
      return code;
    }
    return Prism.highlight(code, Prism.languages[lang], lang);
  }

  return {
    options: {
      walkTokens(token: marked.Token) {
        if (isCodeToken(token)) {
          (token as marked.Tokens.Generic).type = 'prism';
          (token as marked.Tokens.Generic).code = highlight(
            token.text,
            token.lang || 'typescript'
          );
        }
      },
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    },
    extensions: [rendererExtension],
  };
}
