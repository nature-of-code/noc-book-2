import { h } from 'hastscript';

export function heading(tagName) {
  return function (block, parent) {
    const attr = {};

    if (block.id) {
      attr.dataNotionId = block.id.replace(/-/g, '');
    }

    const node = h(
      tagName,
      attr,
      block[block.type].rich_text.map(({ plain_text }) => plain_text).join(''),
    );
    parent.children.push(node);

    return null;
  };
}
