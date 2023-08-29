const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.after(
    'markdown:convert',
    'callout:remove-web-only',
    this.removeWebOnlyBlocks,
  );

  registry.after(
    'markdown:convert',
    'callout:add-heading-icons',
    this.addHeadingIcons,
  );
};

Plugin.prototype = {
  removeWebOnlyBlocks: function (config, stream, extras, callback) {
    stream = stream.pipe(
      through.obj(function (file, _, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        file.$el('div.web-only').remove();

        cb(null, file);
      }),
    );

    callback(null, config, stream, extras);
  },

  addHeadingIcons: function (config, stream, extras, callback) {
    const exerciseIcon = '<img src="icons/exercise.png" class="icon" />';
    const projectIcon = '<img src="icons/project.png" class="icon" />';
    const noteIcon = '<img src="icons/note.png" class="icon" />';

    stream = stream.pipe(
      through.obj(function (file, _, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        file.$el('div[data-type="note"] > h3').each((_, element) => {
          const currentHeading = file.$el(element);
          currentHeading.html(`${noteIcon}${currentHeading.text()}`);
        });

        file.$el('div[data-type="exercise"] > h3').each((_, element) => {
          const currentHeading = file.$el(element);
          currentHeading.html(`${exerciseIcon}${currentHeading.text()}`);
        });

        file.$el('div[data-type="project"] > h3').each((_, element) => {
          const currentHeading = file.$el(element);
          currentHeading.html(`${projectIcon}${currentHeading.text()}`);
        });

        cb(null, file);
      }),
    );

    callback(null, config, stream, extras);
  },
};

module.exports = Plugin;
