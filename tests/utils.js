const cheerio = require('cheerio');
const fs = require('node:fs');
const glob = require('glob');
const path = require('node:path');

function getEditorUrls() {
  const editorUrls = new Map();

  glob.sync('content/*.html').forEach((htmlFilePath) => {
    const source = fs.readFileSync(htmlFilePath);
    const $ = cheerio.load(source.toString());

    $('[data-example-path]').each((_, el) => {
      const $el = $(el);
      const examplePath = $el.attr('data-example-path');
      const editorUrl = $el.attr('data-p5-editor');

      editorUrls.set(path.join('content/', examplePath), editorUrl);
    });
  });

  return editorUrls;
}

module.exports = {
  getEditorUrls,
};
