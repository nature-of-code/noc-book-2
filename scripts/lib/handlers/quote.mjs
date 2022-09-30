import { h } from 'hastscript';
import { transformRichText } from './rich-text.mjs';

export function quote(block, parent) {
  const node = h('blockquote', { dataType: 'epigraph' }, [
    h('p', block[block.type].rich_text.map(transformRichText)),
  ]);
  parent.children.push(node);

  if (block.has_children) {
    return block.children.map((n) => [n, node]);
  }
  return null;
}
