const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.before(
    'chapteropening:transform',
    'footer:running',
    this.runningFooter,
  );
};

Plugin.prototype = {
  runningFooter: function (config, stream, extras, cb) {
    stream = stream.pipe(
      through.obj(function (file, enc, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        const sectionTitle = file.$el('h1').first();
        // match the number and name
        const match = /(\d+)\.\s([A-Za-z\s]+)/.exec(sectionTitle.text());
        const section = sectionTitle.parent('section');

        if (match) {
          // Chapter
          section.attr('data-chapter-title', match[2]);
          section.attr('data-chapter-number', match[1]);
          section.prepend(
            `<div class="running-footer-left">Chapter ${match[1]}</div><div class="running-footer-right">${match[2]}</div><div class="running-footer-first"></div>`,
          );
        } else {
          // Page
          const footerTitleMap = {
            Acknowledgments: 'Acknowledgments',
            Introduction: 'Introduction',
            'Appendix: Creature Design': 'Appendix',
          };
          const footerTitle = footerTitleMap[sectionTitle.text()];
          if (footerTitle) {
            section.prepend(
              `<div class="running-footer-left">${footerTitle}</div><div class="running-footer-right">${footerTitle}</div><div class="running-footer-first"></div>`,
            );
          }
        }

        cb(null, file);
      }),
    );

    cb(null, config, stream, extras);
  },
};

module.exports = Plugin;
