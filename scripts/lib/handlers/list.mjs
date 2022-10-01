import { h } from 'hastscript';
import { transformRichText } from './rich-text.mjs';

export function list(tagName) {
  return function (block, parent) {
    const node = h('li', block[block.type].rich_text.map(transformRichText));
    const container = h(tagName, []);

    const previousSibling = parent.children[parent.children.length - 1];
    // If the previous sibling node (<ul> or <ol>) is the same kind of list,
    // make it a child instead of creating a new list
    if (previousSibling && previousSibling.tagName === container.tagName) {
      previousSibling.children.push(node);

      if (block.has_children) {
        return block.children.map((n) => [n, node]);
      }
      return null;
    }

    // or create a new list wrapper (<ul> or <ol>) when it is not the same as it's previous sibling
    container.children.push(node);
    parent.children.push(container);

    if (block.has_children) {
      return block.children.map((n) => [n, node]);
    }
    return null;
  };
}
