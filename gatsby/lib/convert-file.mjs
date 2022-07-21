import { parseFragment } from 'parse5';
import { fromParse5 } from 'hast-util-from-parse5';
import { toMdast } from 'hast-util-to-mdast';
import { toMarkdown } from 'mdast-util-to-markdown';
import { toString } from 'hast-util-to-string';
import { toHtml } from 'hast-util-to-html';
import { mdxToMarkdown } from 'mdast-util-mdx';
import { mathToMarkdown } from 'mdast-util-math';

export const convert = (html) => {
  const parse5 = parseFragment(html);
  const hast = fromParse5(parse5);

  const mdast = toMdast(hast, {
    handlers: {
      table(h, node) {
        return h(node, 'html', toHtml(node, { space: 'table' }));
      },
      div(h, node) {
        if (node.properties['example-path']) {
          return h(node, 'mdxJsxFlowElement', {
            name: 'Example',
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'path',
                value: node.properties['example-path'],
              },
            ],
          });
        }
      },
      equation(h, node) {
        if (node.properties.dataType === 'inline') {
          return h(node, 'inlineMath', toString(node));
        }
        return h(node, 'math', toString(node));
      },
    },
  });

  return toMarkdown(mdast, {
    listItemIndent: 'one',
    extensions: [mathToMarkdown(), mdxToMarkdown()],
  });
};
