/**
 * Credit goes to Scully for original implementation
 * https://github.com/scullyio/scully/blob/main/libs/scully/src/lib/fileHanderPlugins/markdown.ts
 */
import { marked } from 'marked';

import 'prismjs';
import 'prismjs/components/prism-typescript';
import { PrismMarkedOptionsExtensionConfig } from '.';
import { createRenderer } from './create-renderer';

declare const Prism: typeof import('prismjs');

export const warningLanguageNotAvailable = (lang: string) => `Notice:
---------------------------------------------------------------------------------------
  The requested language '${lang}' is not available with the provided setup.
  To enable, import your main.ts as:
    import 'prismjs/components/prism-${lang}';
---------------------------------------------------------------------------------------
`;

export function markedPrism(
  config?: PrismMarkedOptionsExtensionConfig
): marked.MarkedOptions {
  // only warn about missing Prism language once
  const languageWarnings = new Set<string>();

  const { renderer } = createRenderer();

  return {
    renderer,
    highlight: (code, lang): string => {
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
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  };
}
