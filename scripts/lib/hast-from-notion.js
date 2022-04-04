import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

/**
 * Transform a Notion tree to a hast tree
 *
 * @param {Array<NotionBlock>} blocks
 * @param {String} title
 * @returns {HastNode}
 */
export function fromNotion(blocks, title) {
  const hast = h('section', [h('h1', title), ...blocks.map(transform)]);

  // Merge ordered & unordered list items
  visit(hast, { tagName: 'ol' }, (node, index, parent) => {
    while (
      parent.children[index + 1] &&
      parent.children[index + 1].tagName === 'ol'
    ) {
      node.children.push(parent.children[index + 1].children[0]);
      parent.children.splice(index + 1, 1);
    }
  });
  visit(hast, { tagName: 'ul' }, (node, index, parent) => {
    while (
      parent.children[index + 1] &&
      parent.children[index + 1].tagName === 'ul'
    ) {
      node.children.push(parent.children[index + 1].children[0]);
      parent.children.splice(index + 1, 1);
    }
  });

  return hast;
}

/**
 * @param {NotionBlock} block
 * @returns {HastNode}
 */
function transform(block) {
  switch (block.type) {
    case 'heading_2':
      return h('h2', block.heading_2.rich_text.map(transformText));
    case 'heading_3':
      return h('h3', block.heading_3.rich_text.map(transformText));
    case 'paragraph':
      return h('p', block.paragraph.rich_text.map(transformText));
    case 'image':
      const className = block.image.caption
        .filter(({ annotations }) => annotations.code)
        .map(({ text }) => text.content)
        .join(' ');
      const caption = block.image.caption
        .filter(({ annotations }) => !annotations.code)
        .map(transformText);

      return h('figure', { class: className || null }, [
        h('img', { src: block.image.external.url, alt: caption }),
        h('figcaption', caption),
      ]);
    case 'quote':
      const children = block.has_children ? block.children.map(transform) : [];
      return h('blockquote', { dataType: 'epigraph' }, [
        h('p', block.quote.rich_text.map(transformText)),
        ...children,
      ]);
    case 'equation':
      return h('div', { dataType: 'equation' }, block.equation.expression);
    case 'code':
      return h(
        'pre.codesplit',
        { dataCodeLanguage: block.code.language },
        block.code.rich_text.map(transformText),
      );

    // List
    // wrap every list item in a list tag which will be removed & merged later
    case 'bulleted_list_item':
      return h('ul', [
        h('li', block.bulleted_list_item.rich_text.map(transformText)),
      ]);
    case 'numbered_list_item':
      return h('ol', [
        h('li', block.numbered_list_item.rich_text.map(transformText)),
      ]);

    // Table
    case 'table':
      return h(
        'table',
        h(
          'tbody',
          block.children.map((row) => {
            return h(
              'tr',
              row.table_row.cells.map((cell) =>
                h('td', cell.map(transformText)),
              ),
            );
          }),
        ),
      );

    // Customized blocks
    case 'callout':
      return transformCustomizedBlock(block);

    default:
      console.warn('missing handler for type:', block.type);
      return null;
  }
}

/**
 * @param {NotionRichText} richText
 * @returns {HastNode}
 */
function transformText(richText) {
  switch (richText.type) {
    case 'text':
      let { content } = richText.text;

      if (richText.annotations.italic) {
        content = h('em', content);
      }
      if (richText.annotations.bold) {
        content = h('strong', content);
      }
      if (richText.annotations.code) {
        content = h('code', content);
      }
      return content;

    case 'equation':
      return h('span', { dataType: 'equation' }, richText.equation.expression);

    default:
      console.warn('missing handler for rich_text:', richText.type);
      return null;
  }
}

/**
 * @param {NotionBlock} block
 * @returns {HastNode}
 */
function transformCustomizedBlock(block) {
  const children = block.has_children ? block.children.map(transform) : [];

  switch (block.callout.icon.emoji) {
    // Indexterm
    case '🔗':
      const terms = block.callout.rich_text[0].text.content.split(' / ');
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
        h('span.highlight', block.callout.rich_text.map(transformText)),
      ]);

    // Note
    case '📒':
      return h('div', { dataType: 'note' }, [
        h('h5', block.callout.rich_text[0].text.content),
        ...children,
      ]);

    // Exercise
    case '✏️':
      return h('div', { dataType: 'exercise' }, [
        h('h5', block.callout.rich_text[0].text.content),
        ...children,
      ]);

    // Project
    case '🦎':
      return h('div', { dataType: 'project' }, [
        h('h5', block.callout.rich_text[0].text.content),
        ...children,
      ]);

    default:
      console.warn('missing handler for callout:', block.callout.icon.emoji);
      return null;
  }
}
