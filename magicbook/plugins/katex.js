const path = require('path');
const _ = require('lodash');
const katex = require('katex');
const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.before('stylesheets:move', 'katex:setup', this.setupKatex);
  registry.after('markdown:convert', 'katex:html', this.replaceHTML);
};

Plugin.prototype = {
  setupKatex: function (config, extras, callback) {
    const katexPath = path.dirname(require.resolve('katex'));

    // Stylesheets
    const css = path.join(katexPath, 'katex.css');
    config.stylesheets = config.stylesheets || {};
    config.stylesheets.files = config.stylesheets.files || [];
    if (_.isString(config.stylesheets.files)) {
      config.stylesheets.files = [config.stylesheets.files];
    }
    config.stylesheets.files.unshift(css);

    // Fonts
    const fonts = path.join(katexPath, 'fonts/*.*');
    config.fonts = config.fonts || {};
    config.fonts.files = config.fonts.files || [];
    if (_.isString(config.fonts.files)) {
      config.fonts.files = [config.fonts.files];
    }
    config.fonts.files.unshift(fonts);

    callback(null, config, extras);
  },

  replaceHTML: function (config, stream, extras, callback) {
    stream = stream.pipe(
      through.obj(function (file, enc, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());
        let found = false;

        file
          .$el('span[data-type="equation"],div[data-type="equation"]')
          .each(function (i, el) {
            const jel = file.$el(this);
            let latex = jel.html();

            latex = latex
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>');

            const newEl = file.$el(
              katex.renderToString(latex, { displayMode: el.tagName == 'div' }),
            );

            // Postprocess: divide the left position by 2
            // fixing a PrinceXML bug
            newEl.find('.accent-body').each(function () {
              const accentBody = file.$el(this);
              const currentLeft = parseFloat(accentBody.css('left'), 10);

              accentBody.css('left', `${currentLeft / 2}em`);
            });

            jel.replaceWith(newEl);
            found = true;
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
