import { marked } from 'marked';

interface PrismToken {
  type: 'prism';
  code: string;
  // rest from orignal marked.Tokens.Code
  raw: string;
  codeBlockStyle?: 'indented' | undefined;
  lang?: string | undefined;
  text: string;
}

// type guard
function isPrismToken(token: marked.Tokens.Generic): token is PrismToken {
  return token.type === 'prism';
}

export function createRendererExtension() {
  const rendererExtension: marked.RendererExtension = {
    name: 'prism',
    renderer(token: marked.Tokens.Generic) {
      if (isPrismToken(token)) {
        return token.lang
          ? `<pre class="language-${token.lang}"><code class="language-${token.lang}">${token.code}</code></pre>`
          : '<pre><code>' + token.code + '</code></pre>';
      }

      return false;
    },
  };

  return { rendererExtension };
}
