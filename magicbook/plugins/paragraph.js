const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.after(
    'codesplit:inline',
    'paragraph:combined',
    this.combineNumbersWithUnits,
  );
};

Plugin.prototype = {
  combineNumbersWithUnits: function (config, stream, extras, callback) {
    stream = stream.pipe(
      through.obj(function (file, _, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        file.$el('p').each(function () {
          const paragraph = file.$el(this);
          let html = paragraph.html();

          const replacements = [
            {
              // Nouns (case insensitive) following by integer number: Algorithm | Chapter | rule
              regex: /(algorithm|chapter|rule) (\d+)/gi,
              replacement: '<span class="combined">$1 $2</span>',
            },
            {
              // Figure & Example
              regex: /(Figure|Example) (\d+\.\d+)/g,
              replacement: '<span class="combined">$1 $2</span>',
            },
            {
              // Integers and decimals number following by unit: percent | meters | pixels | degrees
              regex:
                /(-?\d+(\.\d+)?) (percent|meters|pixels|degrees|cells|elementary rulesets|characters|health points|kWh)/g,
              replacement: '<span class="combined">$1 $3</span>',
            },
            {
              // x-axis | y-position
              regex: /(x|y)-(axis|position)/g,
              replacement: '<span class="combined">$1-$2</span>',
            },
            {
              // Embedded code with parenthesis
              regex: /(\(<code>.+?<\/code>\))/g,
              replacement: '<span class="combined">$1</span>',
            },
          ];

          replacements.forEach(({ regex, replacement }) => {
            html = html.replace(regex, replacement);
          });

          // Edge cases
          const edgeCases = [
            '<em>y</em> = <em>x</em>',
            '(<em>x</em>, <em>y</em>)',
            '<span data-type="equation">m_2</span>—',
          ];
          edgeCases.map((item) => {
            html = html.replace(item, `<span class="combined">${item}</span>`);
          });

          paragraph.html(html);
        });

        file.contents = Buffer.from(file.$el.html());

        cb(null, file);
      }),
    );

    callback(null, config, stream, extras);
  },
};

module.exports = Plugin;
