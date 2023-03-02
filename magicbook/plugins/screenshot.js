const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.after(
    'markdown:convert',
    'screenshot:placeholder',
    this.addPlaceholder,
  );
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
};

module.exports = Plugin;
