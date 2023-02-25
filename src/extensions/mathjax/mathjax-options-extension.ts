import { marked } from 'marked';
import { mockApi } from './mathjax-service';

// type guard
function isCodeToken(token: marked.Token): token is marked.Tokens.Code {
  return token.type === 'code';
}

/**
 * Replace markdown code blocks whose language is `latex`.
 * Consumes an API that gets `chtml`.
 *
 * @returns a marked extension
 *
 * Use `marked.use(markedMathjax());`
 *
 * MUST be used last after any code highlighter like Prism.
 */
export function markedMathjax(): marked.MarkedExtension {
  // render amended token
  const rendererExtension: marked.RendererExtension = {
    name: 'mathjax',
    renderer(token) {
      if (token.type === 'mathjax') {
        return token.chtml;
      }
      return false;
    },
  };

  return {
    async: true,
    async walkTokens(token: marked.Token) {
      if (isCodeToken(token) && token.lang === 'latex') {
        // call asyncronous api
        const res = await mockApi.get();

        // amend to a custom token
        (token as marked.Tokens.Generic).chtml = res.chtml;
        (token as marked.Tokens.Generic).type = 'mathjax';
      }
    },
    // entension to render custom token
    extensions: [rendererExtension],
  };
}
