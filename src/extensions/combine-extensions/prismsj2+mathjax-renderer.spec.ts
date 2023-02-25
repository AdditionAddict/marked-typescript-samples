import { describe, expect, test } from 'vitest';
import { markedRender } from './prismjs+mathjax-renderer';

describe('Prism2 + Mathjax extension', () => {
  describe('Prism2 tests', () => {
    test('generates highlighted HTML from CSS markdown', async () => {
      const actual = await markedRender(
        `\`\`\`css\n.block {\n  display: flex;\n}\n\`\`\``
      );
      expect(actual).toMatchInlineSnapshot(`
      "<pre class=\\"language-css\\"><code class=\\"language-css\\"><span class=\\"token selector\\">.block</span> <span class=\\"token punctuation\\">{</span>
        <span class=\\"token property\\">display</span><span class=\\"token punctuation\\">:</span> flex<span class=\\"token punctuation\\">;</span>
      <span class=\\"token punctuation\\">}</span></code></pre>"
    `);
    });
  });

  describe('Mathjax tests', () => {
    test('use the mock api chtml value', async () => {
      const actual = await markedRender(
        `\n\n\`\`\`latex\n\\begin{align}\n` +
          `    \\dot{x} & = \\sigma(y-x) \\\\\n` +
          `    \\dot{y} & = \\rho x - y - xz \\\\\n` +
          `    \\dot{z} & = -\\beta z + xy\n` +
          `    \\end{align}\n\`\`\``
      );
      const expected =
        '<mrow><msup><mfenced><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow></mfenced><mn>2</mn></msup></mrow>';

      expect(actual).toBe(expected);
    });
  });
});
