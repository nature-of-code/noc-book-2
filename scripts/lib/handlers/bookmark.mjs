import { h } from 'hastscript';
import { transformRichText } from './rich-text.mjs';

export function bookmark(block, parent) {
  const url = new URL(block.bookmark.url);

  // if the bookmark url is from p5 web editor
  // import it as an embedded sketch
  if (url.hostname === 'editor.p5js.org') {
    const node = h('figure', [
      h(
        'div',
        {
          dataType: 'embed',
          'data-p5-editor': url.href,
        },
        [],
      ),
      h('figcaption', block.bookmark.caption.map(transformRichText)),
    ]);
    parent.children.push(node);
  }

  return null;
}
