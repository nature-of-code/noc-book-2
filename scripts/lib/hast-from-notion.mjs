import { h } from 'hastscript';
import { handlers } from './handlers/index.mjs';

export function convert(blocks) {
  const tree = h('', []);

  const stack = [blocks.map((block) => [block, tree])];

  while (stack.length > 0) {
    const index = stack.length - 1;
    const queue = stack[index];

    if (queue.length === 0) {
      stack.pop();
      continue;
    }

    const [block, parent] = queue.shift();

    const handler = handlers[block.type];

    if (!handler) {
      console.warn(`Unsupported block type "${block.type}"`);
      continue;
    }

    const entry = handler(block, parent);

    if (entry) stack.push(entry);
  }

  return tree.children;
}

export function fromNotion(blocks, title) {
  const content = convert(blocks);
  return h('section', { dataType: 'chapter' }, [h('h1', title), ...content]);
}
