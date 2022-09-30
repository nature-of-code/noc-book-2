import { h } from 'hastscript';
import { transformRichText } from './rich-text.mjs';

export function code(block, parent) {
  const node = h(
    'pre',
    {
      class: 'codesplit',
      dataCodeLanguage: block.code.language,
    },
    block.code.rich_text.map(transformRichText),
  );
  parent.children.push(node);

  return null;
}
