const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.after(
    'markdown:convert',
    'screenshot:placeholder',
    this.addPlaceholder,
  );
  registry.after('screenshot:placeholder', 'screenshot:frame', this.addFrame);
};

Plugin.prototype = {
  addPlaceholder: function (config, stream, extras, cb) {
    stream = stream.pipe(
      through.obj(function (file, enc, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        // add placeholder image to embed div that doesn't have any images
        file
          .$el('div[data-type=embed]')
          .filter(function () {
            return file.$el(this).find('img').length === 0;
          })
          .append('<img src="placeholder-screenshot.png">');

        cb(null, file);
      }),
    );

    cb(null, config, stream, extras);
  },

  addFrame: function (config, stream, extras, cb) {
    stream = stream.pipe(
      through.obj(function (file, enc, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        // custom doodle frame
        file
          .$el('div[data-type=embed]')
          .filter(function () {
            return (
              file.$el(this).closest('div[data-type="example"]').length === 0
            );
          })
          // only apply on embed sketches that are not examples, mostly, figures or exercises
          .wrapInner(function () {
            const screenshot = file.$el(this).html();
            return `<div class="frame-mid"><div class="column"><img src="screenshot-frame/column.png"></div><div class="middle">${screenshot}</div><div class="column"><img src="screenshot-frame/column.png"></div></div>`;
          })
          .addClass('screenshot-frame')
          // top
          .prepend(
            '<div class="frame-top"><img src="screenshot-frame/top-left.png"><div class="middle"><img src="screenshot-frame/top-mid.png"></div><img src="screenshot-frame/top-right.png"></div>',
          )
          // bottom
          .append(
            '<div class="frame-bottom"><img src="screenshot-frame/bottom-left.png"><div class="middle"><img src="screenshot-frame/bottom-mid.png"></div><img src="screenshot-frame/bottom-right.png"></div>',
          );

        cb(null, file);
      }),
    );

    cb(null, config, stream, extras);
  },
};

module.exports = Plugin;
