import { h } from 'hastscript';
import { transformRichText } from './rich-text.mjs';

export function paragraph(block, parent) {
  const node = h('p', block[block.type].rich_text.map(transformRichText));
  parent.children.push(node);

  if (block.has_children) {
    // make the children the same level as it is
    return block.children.map((n) => [n, parent]);
  }
  return null;
}
