import { describe, expect, test } from 'vitest';
import { marked } from 'marked';
import { markedRender } from './katex-renderer';
import { markedKatex } from './katex-extension';

describe('Katex tests', () => {
  const snapshots: {
    [key: string]: string;
  } = {
    'readme example': 'katex: $c = \\pm\\sqrt{a^2 + b^2}$',
    'inline katex': `
This is inline katex: $c = \\pm\\sqrt{a^2 + b^2}$
`,
    'block katex': `
This is block level katex:
$$
c = \\pm\\sqrt{a^2 + b^2}
$$
`,
    'inline katex more $': `
This is inline katex: $$c = \\pm\\sqrt{a^2 + b^2}$$
`,
    'block katex more $': `
This is block level katex:
$$$
c = \\pm\\sqrt{a^2 + b^2}
$$$
`,
    'block katex 1 $': `
This is block level katex:
$
c = \\pm\\sqrt{a^2 + b^2}
$
`,
  };

  test('still generates HTML from markdown', () => {
    const actual = markedRender('*hello world*');
    const expected = `<p><em>hello world</em></p>\n`;
    expect(actual).toBe(expected);
  });

  for (const name in snapshots) {
    test(name, () => {
      marked.use(markedKatex());
      const md = snapshots[name];
      expect(marked(md)).toMatchSnapshot();
    });
  }

  test('inline katex', () => {
    marked.use(markedKatex());
    const md = `
  This is inline katex: $c = \\pm\\sqrt{a^2 + b^2}$
  `;
    expect(marked(md)).toMatchSnapshot();
  });
});
