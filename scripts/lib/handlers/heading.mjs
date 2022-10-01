import { h } from 'hastscript';
import { transformRichText } from './rich-text.mjs';

export function heading(tagName) {
  return function (block, parent) {
    const node = h(tagName, block[block.type].rich_text.map(transformRichText));
    parent.children.push(node);

    return null;
  };
}
