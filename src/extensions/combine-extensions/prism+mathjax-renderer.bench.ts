import { bench, describe } from 'vitest';
import { markedRender } from '../prismjs/prismjs-renderer';
import { markedRender as markRenderVersion2 } from '../prismjs/alternative_version/prismjs-renderer-2';

describe('Prism plus mathjax', () => {
  bench('Prism version 1', () => {
    markedRender(`\`\`\`css\n.block {\n  display: flex;\n}\n\`\`\``);
  });
  bench('Prism version 2', () => {
    markRenderVersion2(`\`\`\`css\n.block {\n  display: flex;\n}\n\`\`\``);
  });
});
