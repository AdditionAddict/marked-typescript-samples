import { marked } from 'marked';

export function createRenderer() {
  const renderer = new marked.Renderer();
  // wrap code block the way Prism.js expects it
  renderer.code = function (
    // casting required to access `this.options` in typescript
    this: marked.Renderer<never>,
    code,
    lang
  ) {
    // We provide the highlight function below as part of the
    // `MarkedOptions` return so this should always be defined.
    // Unless overridden by another extension, so we check.
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

  return { renderer };
}
