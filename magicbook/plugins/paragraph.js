const through = require('through2');
const cheerio = require('cheerio');

const Plugin = function (registry) {
  registry.after(
    'codesplit:inline',
    'paragraph:combined',
    this.combineNumbersWithUnits,
  );
};

const edgeCases = [
  '<em>y</em> = <em>x</em>',
  '(<em>x</em>, <em>y</em>)',
  '<span data-type="equation">m_2</span>—',
];

const edgeCasesRegex = new RegExp(
  edgeCases.map((ec) => ec.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'g',
);

const combinationsRegex = [
  // Nouns (case insensitive) following by integer number: Algorithm | Chapter | rule
  /(algorithm|chapter|rule) (\d+)/gi,
  // Figure & Example x.x
  /(Figure|Example) (\d+\.\d+)/g,
  // Integers and decimals number following by unit: percent | meters | pixels | degrees
  /(-?\d+(\.\d+)?) (percent|meters|pixels|degrees|cells|elementary rulesets|characters|health points|kWh)/g,
  // x-axis | y-position
  /(x|y)-(axis|position)/g,
  // Embedded code with parenthesis
  /(\(<code>.+?<\/code>\))/g,
  // Edge cases
  edgeCasesRegex,
];

Plugin.prototype = {
  combineNumbersWithUnits: function (config, stream, extras, callback) {
    stream = stream.pipe(
      through.obj(function (file, _, cb) {
        file.$el = file.$el || cheerio.load(file.contents.toString());

        file.$el('p').each(function () {
          const paragraph = file.$el(this);
          let html = paragraph.html();

          combinationsRegex.forEach((regex) => {
            html = html.replace(regex, '<span class="combined">$&</span>');
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
