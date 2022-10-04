import { h } from 'hastscript';
import { transformRichText } from './rich-text.mjs';

export function image(block, parent) {
  const className = block.image.caption
    .filter(({ annotations }) => annotations.code)
    .map(({ plain_text }) => plain_text)
    .join(' ');

  const caption = block.image.caption.filter(
    ({ annotations }) => !annotations.code,
  );

  const node = h('figure', { class: className || null }, [
    h('img', {
      src: block.image[block.image.type].url,
      alt: caption.map(({ plain_text }) => plain_text).join(''),
    }),
    h('figcaption', caption.map(transformRichText)),
  ]);
  parent.children.push(node);

  return null;
}
