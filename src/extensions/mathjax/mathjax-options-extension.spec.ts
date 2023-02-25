import { describe, expect, test } from 'vitest';
import { markedRender } from './mathjax-renderer';

describe.only('Mathjax extension', () => {
  test('still generates HTML from markdown', async () => {
    const actual = await markedRender('*hello world*');
    const expected = `<p><em>hello world</em></p>\n`;
    expect(actual).toBe(expected);
  });

  test('does not affect the default marked for code blocks', async () => {
    const actual = await markedRender(
      `\`\`\`css\n.block {\n  display: flex;\n}\n\`\`\``
    );
    expect(actual).toMatchInlineSnapshot(`
      "<pre><code class=\\"language-css\\">.block {
        display: flex;
      }
      </code></pre>
      "
    `);
  });

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
