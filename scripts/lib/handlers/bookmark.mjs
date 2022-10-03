import { h } from 'hastscript';

export function bookmark(block, parent) {
  const url = new URL(block.bookmark.url);

  // if the bookmark url is from p5 web editor
  // import it as an embedded sketch
  if (url.hostname === 'editor.p5js.org') {
    const attr = {
      dataType: 'embed',
      'data-p5-editor': url.href,
    };

    const node = h('div', attr, []);
    parent.children.push(node);
  }

  return null;
}
