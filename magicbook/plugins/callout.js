const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.after(
    'markdown:convert',
    'callout:remove-web-only',
    this.removeWebOnlyBlocks,
  );

  registry.after('markdown:convert', 'callout:add-heading-icons', this.addHeadingIcons);
};

Plugin.prototype = {
  removeWebOnlyBlocks: function (config, stream, extras, callback) {
    stream = stream.pipe(
      through.obj(function (file, _, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        file.$el('div[data-type="web-only"]').remove();

        cb(null, file);
      }),
    );

    callback(null, config, stream, extras);
  },

  addHeadingIcons: function(config, stream, extras, callback) {
    const icon = '😀';

    stream = stream.pipe(
      through.obj(function (file, _, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        file.$el('div[data-type="exercise"] > h3').each((_, element) => {
          const currentHeading = file.$el(element);
          currentHeading.html(`${icon} ${currentHeading.text()}`);
        });

        cb(null, file);
      }),
    );

    callback(null, config, stream, extras);
  }
};

module.exports = Plugin;
