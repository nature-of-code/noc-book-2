import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

// Special characters for marking blanks and separators
const BLANK_MARKER = '\u2420';
const SEPARATOR = '\u2063';

export const preserveCustomSpans = () => (tree) => {
  visit(tree, 'element', (node, index, parent) => {
    if (isBlankSpan(node)) {
      const reservedString = toString(node);
      parent.properties['data-blanks'] = parent.properties['data-blanks']
        ? `${parent.properties['data-blanks']}${SEPARATOR}${reservedString}`
        : reservedString;

      parent.children.splice(index, 1, { type: 'text', value: BLANK_MARKER });
    }
  });
};

export const restoreCustomSpans = () => (tree) => {
  visit(tree, 'element', (node) => {
    if (node.tagName === 'codesplit') {
      let containsBlank = false;

      visit(node, 'element', (nodeInCodesplit) => {
        if (
          nodeInCodesplit.tagName === 'code' &&
          nodeInCodesplit.properties['data-blanks']
        ) {
          const blanks =
            nodeInCodesplit.properties['data-blanks'].split(SEPARATOR);
          restoreBlankSpans(nodeInCodesplit, blanks);
          delete nodeInCodesplit.properties['data-blanks'];
          containsBlank = true;
        }
      });

      if (containsBlank) {
        node.properties['data-contains-blank'] = true;
      }
    }
  });
};

const isBlankSpan = (node) =>
  node.tagName === 'span' &&
  Array.isArray(node.properties.className) &&
  node.properties.className.includes('blank');

const restoreBlankSpans = (node, blanks) => {
  let blankIndex = 0;

  visit(node, 'text', (textNode, index, parent) => {
    if (textNode.value.includes(BLANK_MARKER)) {
      const parts = textNode.value.split(BLANK_MARKER);
      const newNodes = parts.flatMap((part, i) => {
        const nodes = part ? [{ type: 'text', value: part }] : [];
        if (i < parts.length - 1 && blankIndex < blanks.length) {
          nodes.push({
            type: 'element',
            tagName: 'span',
            properties: { className: ['blank'] },
            children: [{ type: 'text', value: blanks[blankIndex++] }],
          });
        }
        return nodes;
      });
      parent.children.splice(index, 1, ...newNodes);
      return index + newNodes.length;
    }
  });
};
