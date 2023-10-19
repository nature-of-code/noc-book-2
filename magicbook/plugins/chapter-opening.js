const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.after(
    'markdown:convert',
    'chapteropening:transform',
    this.transformOpening,
  );
};

Plugin.prototype = {
  transformOpening: function (config, stream, extras, cb) {
    stream = stream.pipe(
      through.obj(function (file, enc, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        const chapterTitle = file.$el('h1').first();

        // match the number and name
        const match = /(\d+)\.\s([A-Za-z\s]+)/.exec(chapterTitle.text());
        if (match) {
          chapterTitle.replaceWith(
            `<div class="chapter-opening"><div class="chapter-opening-header"><span class="chapter-number">${match[1]}</span><div class="chapter-opening-title"><h1>${match[2]}</h1></div></div></div>`,
          );

          // if chapter-opening-quote exist
          const chapterOpeningQuote = file.$el('div.chapter-opening-quote');
          if (chapterOpeningQuote.length > 0) {
            file.$el('div.chapter-opening-title').append(chapterOpeningQuote);
          }

          // if chapter-opening-figure exist
          const chapterOpeningFigure = file.$el('div.chapter-opening-figure');
          if (chapterOpeningFigure.length > 0) {
            file.$el('div.chapter-opening').append(chapterOpeningFigure);

            // move figcaption content to a new `p` tag after the last paragraph
            const captionText =
              file.$el('div.chapter-opening-figure figcaption').text() || '';
            file.$el('div.chapter-opening-figure figcaption').remove();
            file
              .$el('div.chapter-opening-figure')
              .append('<p class="caption">' + captionText + '</p>');
          }
        }

        if (config.chapterOpeningPagesOnly) {
          const chapterOpening = file.$el('div.chapter-opening');
          if (chapterOpening.length > 0) {
            chapterOpening.nextAll().remove();
          } else {
            file.$el('section').remove();
          }
        }
        cb(null, file);
      }),
    );

    cb(null, config, stream, extras);
  },
};

module.exports = Plugin;
