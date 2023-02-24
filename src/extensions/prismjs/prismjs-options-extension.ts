/**
 * Credit goes to Scully for original implementation
 * https://github.com/scullyio/scully/blob/main/libs/scully/src/lib/fileHanderPlugins/markdown.ts
 */
import { marked } from 'marked';

import 'prismjs';
import 'prismjs/components/prism-typescript';
import { PrismMarkedOptionsExtensionConfig } from '.';

declare const Prism: typeof import('prismjs');

export const warningLanguageNotAvailable = (lang: string) => `Notice:
---------------------------------------------------------------------------------------
  The requested language '${lang}' is not available with the provided setup.
  To enable, import your main.ts as:
    import 'prismjs/components/prism-${lang}';
---------------------------------------------------------------------------------------
`;

export function markedPrism(
  options?: PrismMarkedOptionsExtensionConfig
): marked.MarkedOptions {
  // only warn about missing Prism language once
  const languageWarnings = new Set<string>();

  const renderer = new marked.Renderer();
  // wrap code block the way Prism.js expects it
  renderer.code = function (
    // casting required to access `this.options` in typescript
    this: marked.Renderer<never>,
    code,
    lang
  ) {
    // We provide the highlight function below as part of the
    // return so this should always be defined. Unless overridden.
    if (!this.options.highlight) {
      throw new Error(`\`highlight\` not set as a marked option. This can be caused
      by another extension overriding the prism highlight set by this plugin.`);
    }

    const highlightedCode: string | void = this.options.highlight(
      code,
      lang || 'typescript' // default to typescript
    );
    if (!highlightedCode) {
      throw new Error('`highlight` returned void');
    }

    if (!lang) {
      return '<pre><code>' + highlightedCode + '</code></pre>';
    }
    // e.g. "language-js"
    const langClass = 'language-' + lang;
    return (
      '<pre class="' +
      langClass +
      '"><code class="' +
      langClass +
      '">' +
      highlightedCode +
      '</code></pre>'
    );
  };

  return {
    renderer,
    highlight: (code, lang): string => {
      // check if Prism language is supported
      if (!Prism.languages[lang]) {
        // warn only once, if warnings not suppressed
        if (!options?.suppressWarning && !languageWarnings.has(lang)) {
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
