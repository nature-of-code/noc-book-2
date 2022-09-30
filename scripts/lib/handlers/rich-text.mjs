import { h } from 'hastscript';

/**
 * @param {NotionRichText} richText
 * @returns {HastNode}
 */
export function transformRichText(richText) {
  switch (richText.type) {
    case 'text':
      const {
        text: { content },
        annotations,
        href,
      } = richText;

      let node = {
        type: 'text',
        value: content,
      };

      if (annotations) {
        if (annotations.italic) {
          node = h('em', [node]);
        }
        if (annotations.bold) {
          node = h('strong', [node]);
        }
        if (annotations.code) {
          node = h('code', [node]);
        }
      }

      if (href) {
        node = h('a', { href }, [node]);
      }

      return node;

    case 'equation':
      return h('span', { dataType: 'equation' }, richText.equation.expression);

    default:
      console.warn('missing handler for rich_text:', richText.type);
      return null;
  }
}
