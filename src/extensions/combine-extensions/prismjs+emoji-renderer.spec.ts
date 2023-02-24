import { describe, expect, test } from 'vitest';
import { markedRender } from './prismjs+emoji-renderer';

describe('Prism + Emoji extension', () => {
  const emojiOptions = {
    emojis: {
      heart: '❤️',
      tada: '🎉',
    },
    unicode: true,
  };

  describe('Emoji tests', () => {
    test('renders emojis supplied', () => {
      const actual = markedRender('I :heart: marked! :tada:', {
        emojis: {
          heart: '❤️',
          tada: '🎉',
        },
        unicode: true,
      });
      const expected = `<p>I ❤️ marked! 🎉</p>\n`;
      expect(actual).toBe(expected);
    });
  });
  describe('Prism tests', () => {
    test('generates highlighted HTML from CSS markdown', () => {
      const actual = markedRender(
        `\`\`\`css\n.block {\n  display: flex;\n}\n\`\`\``,
        emojiOptions
      );
      expect(actual).toMatchInlineSnapshot(`
      "<pre class=\\"language-css\\"><code class=\\"language-css\\"><span class=\\"token selector\\">.block</span> <span class=\\"token punctuation\\">{</span>
        <span class=\\"token property\\">display</span><span class=\\"token punctuation\\">:</span> flex<span class=\\"token punctuation\\">;</span>
      <span class=\\"token punctuation\\">}</span></code></pre>"
    `);
    });
  });

  describe('Prism and emoji test', () => {
    test('can render both code and emojis', () => {
      const actual = markedRender(
        `I :heart: css!\n\`\`\`css\n.block {\n  display: flex;\n}\n\`\`\``,
        emojiOptions
      );
      expect(actual).toMatchInlineSnapshot(`
        "<p>I ❤️ css!</p>
        <pre class=\\"language-css\\"><code class=\\"language-css\\"><span class=\\"token selector\\">.block</span> <span class=\\"token punctuation\\">{</span>
          <span class=\\"token property\\">display</span><span class=\\"token punctuation\\">:</span> flex<span class=\\"token punctuation\\">;</span>
        <span class=\\"token punctuation\\">}</span></code></pre>"
      `);
    });
  });
});
