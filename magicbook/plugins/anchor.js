const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.after('markdown:convert', 'anchor:url', this.addExternalLink);
};

Plugin.prototype = {
  addExternalLink: function (config, stream, extras, callback) {
    stream = stream.pipe(
      through.obj(function (file, _, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        file.$el('a').each(function () {
          const anchor = file.$el(this);
          let href = anchor.attr('href');
          if (/^http/.exec(href)) {
            href = href.replace(/[._=&-]+/g, '<wbr>$&');
            href = href.replace(/[:/#]+/g, '$&<wbr>');
            anchor.append(` (<span class="url">${href}</span>)`);
          }
        });

        file.contents = Buffer.from(file.$el.html());

        cb(null, file);
      }),
    );

    callback(null, config, stream, extras);
  },
};

module.exports = Plugin;
