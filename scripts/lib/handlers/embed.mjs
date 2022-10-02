import { h } from 'hastscript';

export function embed(block, parent) {
  const attr = {
    dataType: 'example',
    'data-p5-editor': block.bookmark.url,
  };

  const node = h('div', attr, []);
  parent.children.push(node);

  return null;
}
