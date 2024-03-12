const _ = require('lodash');
const cheerio = require('cheerio');
const through = require('through2');

const Plugin = function (registry) {
  registry.after(
    'markdown:convert',
    'codesplit:inline',
    _.bind(this.parseInline, this),
  );
};

Plugin.prototype = {
  isComment: function (str) {
    const plainStr = str.replace(/<\/?(strong|em|s)>/g, '').trim();
    return /^\s*\/\//.test(plainStr);
  },

  countIndent: function (str) {
    const match = str.match(/^(\s+)/);
    return match ? match[0].length : 0;
  },

  parseExample: function (code) {
    const $ = cheerio.load(
      '<div class="codesplit"><div class="pairs"></div></div>',
    );
    const lines = code.split('\n');

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
      const currentIndent = this.countIndent(line);
      // Closing a pair:
      // - when there is no comment, but code
      // - when another comment (not right after the last comment) appear
      // - when the indentation goes `backward`
      // - when a blank line appear
      // - when the custom max line number is achieved
      if (
        (pair.comment.length === 0 && pair.code.length > 0) ||
        (this.isComment(line) && pair.code.length > 0) ||
        (!pair.maxLines && currentIndent < pair.indent) ||
        (!pair.maxLines && line === '') ||
        (!!pair.maxLines && pair.code.length >= pair.maxLines)
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
      if (this.isComment(line)) {
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

    pairs.forEach((pair) => {
      const code = pair.code.join('\n') + '\n';
      const comments = pair.comment
        .map((str) => str.replace('//', '').trim())
        .filter((str) => !!str);
      const className = pair.className.concat('pair');

      // highlight the pair that has comment
      if (pair.comment.length > 0) className.push('highlight');

      $('.pairs').append(
        `<div class="${className.join(' ')}">
          <pre><code class="code language-js">${code}</code></pre>
          ${
            comments.length > 0
              ? `<div class="comment"><p>${comments.join('\n')}</p></div>`
              : ''
          }
      </div>`,
      );
    });

    return $.html();
  },

  parseInline: function (config, stream, extras, callback) {
    const self = this;
    // loop through all files and find codesplit classes
    // that haven't yet been parsed.
    stream = stream.pipe(
      through.obj((file, enc, cb) => {
        let found = false;
        file.$el = file.$el || cheerio.load(file.contents.toString());

        file.$el('.codesplit').each((_, element) => {
          var jel = file.$el(element);
          if (jel.find('.pairs').length == 0) {
            found = true;
            jel.replaceWith(self.parseExample(jel.html()));
          }
        });

        if (found) {
          file.contents = Buffer.from(file.$el.html());
        }

        cb(null, file);
      }),
    );

    callback(null, config, stream, extras);
  },
};

module.exports = Plugin;
