import { h } from 'hastscript';
import { transformRichText } from './rich-text.mjs';

function transformCallout(block) {
  const plainTextTitle = block.callout.rich_text
    .map(({ text }) => text.content)
    .join('');

  switch (block.callout.icon.emoji) {
    // Indexterm
    case '🔗':
      const terms = plainTextTitle.split('/').map((term) => term.trim());
      const attributes = {
        dataType: 'indexterm',
        dataPrimary: terms[0],
      };
      if (terms.length > 1) attributes.dataSecondary = terms[1];
      if (terms.length > 2) attributes.dataTertiary = terms[2];

      return h('a', attributes);

    // Highlight
    case '💡':
      return h('p', [
        h('span.highlight', block.callout.rich_text.map(transformRichText)),
      ]);

    // Note
    case '📒':
      return h('div', { dataType: 'note' }, [
        h('h3', block.callout.rich_text.map(transformRichText)),
      ]);

    // Exercise
    case '✏️':
      return h('div', { dataType: 'exercise' }, [
        h('h3', block.callout.rich_text.map(transformRichText)),
      ]);

    // Project
    case '🦎':
      return h('div', { dataType: 'project' }, [
        h('h3', block.callout.rich_text.map(transformRichText)),
      ]);

    // Example
    case '💻':
      const attr = { dataType: 'example' };

      if (block.has_children) {
        const examples = block.children
          .filter(({ type }) => type === 'bookmark')
          .map(({ bookmark }) => bookmark.url);

        if (examples && examples.length > 0) {
          attr['data-p5-editor'] = examples.join('&');
          attr['data-example-title'] = plainTextTitle;
        }
      }

      return h('div', attr, [
        h('h3', block.callout.rich_text.map(transformRichText)),
      ]);

    default:
      console.warn('missing handler for callout:', block.callout.icon.emoji);
      return null;
  }
}

export function callout(block, parent) {
  const node = transformCallout(block);
  if (node) parent.children.push(node);

  if (block.has_children) {
    return block.children.map((n) => [n, node]);
  }
  return null;
}
