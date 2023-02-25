import { bench, describe } from 'vitest';
import { markedRender } from '../prismjs-renderer';
import { markedRender as markRenderVersion2 } from './prismjs-renderer-2';

describe('Basic', () => {
  bench('Prism version 1', () => {
    markedRender(`\`\`\`css\n.block {\n  display: flex;\n}\n\`\`\``);
  });
  bench('Prism version 2', () => {
    markRenderVersion2(`\`\`\`css\n.block {\n  display: flex;\n}\n\`\`\``);
  });
});
