import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import { toHtml } from 'hast-util-to-html';
import { fromHtml } from 'hast-util-from-html';

/**
 * Modifed from https://github.com/magicbookproject/magicbook-codesplit/blob/master/src/codesplit.js
 */

const isComment = (str) => {
  return /^\s*\/\//.test(str);
};

const countIndent = (str) => {
  const match = str.match(/^(\s+)/);
  return match ? match[0].length : 0;
};

export const rehypeCodesplit = () => (tree) => {
  visit(tree, { tagName: 'pre' }, (node) => {
    if (
      node.properties.className &&
      node.properties.className.includes('codesplit')
    ) {
      const lines = toHtml(node.children).split('\n');
      const lang = node.properties.dataCodeLanguage;

      // if the first line was a linebreak, let's get rid of it.
      // allows people to not have <pre> and code on same line.
      if (lines[0] == '') lines.shift();

      const pairs = [];

      let pair = {
        indent: 0,
        className: [],
        code: [],
        comment: [],
      };

      for (let line of lines) {
        const currentIndent = countIndent(line);
        // Closing a pair:
        // - when there is no comment, but code
        // - when another comment (not right after the last comment) appear
        // - when the indentation goes `backward`
        // - when a blank line appear
        // - when the custom max line number is achieved
        if (
          (pair.comment.length === 0 && pair.code.length > 0) ||
          (isComment(line) && pair.code.length > 0) ||
          (!pair.maxLines && currentIndent < pair.indent) ||
          (!pair.maxLines && line === '') ||
          (pair.maxLines !== undefined && pair.code.length >= pair.maxLines)
        ) {
          if (pair.code.length > 0 || pair.comment.length > 0) {
            pairs.push(pair);
          }

          pair = {
            indent: currentIndent,
            className: [],
            code: [],
            comment: [],
          };
        }

        // parse comment as:
        // {!maxLines .className #id}
        if (isComment(line)) {
          const regex = /\{(.+)\}/;
          const match = regex.exec(line);
          if (match) {
            // match !.#
            const marks = match[1].match(/([!#.])([^!#.\s]+)/g);

            if (marks) {
              marks.forEach((mark) => {
                switch (mark.charAt(0)) {
                  case '#':
                    pair.id = mark.substring(1);
                    break;
                  case '.':
                    pair.className.push(mark.substring(1));
                    break;
                  case '!':
                    pair.maxLines = parseInt(mark.substring(1));
                    break;
                }
              });
            }
            line = line.replace(regex, '');
          }

          pair.comment.push(line);

          continue;
        }

        pair.code.push(line);
      }
      pairs.push(pair);

      const children = pairs.map((pair) => {
        const code = fromHtml(pair.code.join('\n') + '\n', { fragment: true });
        const comments = pair.comment
          .map((str) => str.replace('//', '').trim())
          .filter((str) => !!str);

        const className = pair.className.concat('pair');

        // highlight the pair that has comment
        if (pair.comment.length > 0) className.push('split');

        return h('div', { className }, [
          h('pre', [h('code', { class: ['code', `language-${lang}`] }, code)]),
          h('div', { class: ['comment'] }, h('p', fromHtml(comments.join('\n'), { fragment: true }))),
        ]);
      });

      node.tagName = 'div';
      node.properties.className = ['codesplit', 'callout', 'not-prose'];
      node.children = children;
    }
  });
};
