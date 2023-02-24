import { marked } from 'marked';

export function markedRender(content: string) {
  return marked(content);
}
