import {
  afterEach,
  beforeAll,
  describe,
  expect,
  SpyInstance,
  test,
  vi,
} from 'vitest';
import { warningLanguageNotAvailable } from './prismjs-options-extension-2';
import { markedRender } from './prismjs-renderer-2';

describe('Prism tests', () => {
  let logger: SpyInstance;

  beforeAll(() => {
    logger = vi.spyOn(console, 'warn');
    logger.mockImplementation(() => ({}));
  });

  afterEach(() => {
    logger.mockClear();
  });
  test('still generates HTML from markdown', () => {
    const actual = markedRender('*hello world*');
    const expected = `<p><em>hello world</em></p>\n`;
    expect(actual).toBe(expected);
  });

  test('generates highlighted HTML from CSS markdown', () => {
    const actual = markedRender(
      `\`\`\`css\n.block {\n  display: flex;\n}\n\`\`\``
    );
    expect(actual).toMatchInlineSnapshot(`
      "<pre class=\\"language-css\\"><code class=\\"language-css\\"><span class=\\"token selector\\">.block</span> <span class=\\"token punctuation\\">{</span>
        <span class=\\"token property\\">display</span><span class=\\"token punctuation\\">:</span> flex<span class=\\"token punctuation\\">;</span>
      <span class=\\"token punctuation\\">}</span></code></pre>"
    `);
  });

  test('generates highlighted HTML from code markdown without language set', () => {
    const actual = markedRender(`\`\`\`\nconst x = { "foo": "bar" }\n\`\`\``);
    expect(actual).toMatchInlineSnapshot(
      '"<pre><code><span class=\\"token keyword\\">const</span> x <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token string-property property\\">\\"foo\\"</span><span class=\\"token operator\\">:</span> <span class=\\"token string\\">\\"bar\\"</span> <span class=\\"token punctuation\\">}</span></code></pre>"'
    );
  });

  test('warns if language not imported', () => {
    markedRender(`\`\`\`sql\nSELECT * from myTable;\n\`\`\``);
    expect(logger).toBeCalledTimes(1);
    expect(logger).toHaveBeenCalledWith(warningLanguageNotAvailable('sql'));
  });

  test('allows suppression of warning if language not imported', () => {
    markedRender(`\`\`\`sql\nSELECT * from myTable;\n\`\`\``, {
      suppressWarning: true,
    });
    expect(logger).not.toBeCalled;
  });

  test('warns only once if language not imported', () => {
    markedRender(
      `\`\`\`sql\nSELECT * from myTable;\n\`\`\`\n\n\`\`\`sql\nSELECT * from myOtherTable;\n\`\`\``
    );
    expect(logger).toBeCalledTimes(1);
    expect(logger).toHaveBeenCalledWith(warningLanguageNotAvailable('sql'));
  });
});
