import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';

/**
 * Modifed from https://github.com/magicbookproject/magicbook-codesplit/blob/master/src/codesplit.js
 */

const isComment = (str) => {
  return /^\s*\/\//.test(str);
};

export const rehypeCodesplit = () => (tree) => {
  visit(tree, { tagName: 'pre' }, (node) => {
    if (
      node.properties.className &&
      node.properties.className.includes('codesplit')
    ) {
      const lines = toString(node).split('\n');
      const lang = node.properties.dataCodeLanguage;
      const pairs = [];
      let lastType = null;

      lines.forEach((line) => {
        // what type of line is this?
        const type = isComment(line) ? 'comment' : 'code';
        let pair = pairs[pairs.length - 1];

        // should we create a new pair?
        if (
          pairs.length === 0 ||
          (lastType === 'code' && type === 'comment') ||
          (pair.maxLines && pair.code.length >= pair.maxLines)
        ) {
          pair = {
            code: [],
            comment: [],
            className: [],
          };
          pairs.push(pair);
        }

        // Parse attributes if comment
        if (type === 'comment') {
          const regex = /\{(.+)\}/;
          const match = regex.exec(line);
          if (match) {
            var values = match[1].trim().split(' ');
            values.forEach((value) => {
              if (value.charAt(0) === '#') pair.id = value.substring(1);
              if (value.charAt(0) === '.') {
                pair.className.push(value.substring(1));
              }

              if (value.charAt(0) === '!')
                pair.maxLines = parseInt(value.substring(1));
            });

            line = line.replace(regex, '');
          }
        }

        lastType = type;
        pair[type].push(line);
      });

      // Find pairs where code has an empty line. If that pair has a comment
      // and the next pair has a comment, make that line a separate pair,
      // so we get a nice spacing.
      for (let i = pairs.length - 2; i >= 0; i--) {
        const cur = pairs[i];
        const nex = pairs[i + 1];
        if (
          cur.comment.length > 0 &&
          nex.comment.length > 0 &&
          cur.code[cur.code.length - 1] === ''
        ) {
          cur.code.pop();
          pairs.splice(i + 1, 0, { code: [''], comment: [], className: [] });
        }
      }

      const children = pairs.map((pair) => {
        const codes = pair.code.join('\n') + '\n';
        const comments =
          pair.comment.map((str) => str.replace('//', '').trim()).join('\n') +
          '\n';
        const className = pair.className.concat('pair');

        if (pair.comment.length < 1) className.push('no-comment');

        return h('div', { className }, [
          h('pre', [h('code', { class: ['code', `language-${lang}`] }, codes)]),
          h('p', { class: ['comment'] }, comments),
        ]);
      });

      node.tagName = 'div';
      node.properties.className = ['codesplit', 'not-prose'];
      node.children = children;
    }
  });
};
