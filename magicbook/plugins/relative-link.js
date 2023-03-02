const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.after(
    'markdown:convert',
    'relativelink:href',
    this.replaceRelativeHref,
  );
};

Plugin.prototype = {
  replaceRelativeHref: function (config, stream, extras, callback) {
    stream = stream.pipe(
      through.obj(function (file, _, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());
        let found = false;

        file.$el('a').each(function () {
          const jel = file.$el(this);
          const prefHref = jel.attr('href');

          // test if is a valid relative link
          if (prefHref && prefHref.indexOf('://') < 0) {
            // remove the relative path
            jel.attr('href', `#${prefHref.split('#')[1]}`);
            found = true;
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
