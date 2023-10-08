const cheerio = require('cheerio');
const fs = require('node:fs');
const glob = require('glob');
const path = require('node:path');
const { getLinter } = require('./linter');
const { getEditorUrls } = require('./utils');

const externalAllowList = [
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js',
  'https://unpkg.com/ml5@latest/dist/ml5.min.js', // TODO pin version when ml5-next-gen is stable
  'https://cdn.jsdelivr.net/gh/hapticdata/toxiclibsjs@0.3.2/build/toxiclibs.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js',
];

const editorUrls = getEditorUrls();

// ---

describe('Validate examples <script> tags', () => {
  const protocolRegex = /^https?:\/\//;

  glob.sync('content/examples/*/*/index.html').forEach((indexPath) => {
    const dir = path.parse(indexPath).dir;

    describe(`${indexPath} | ${editorUrls.get(dir)}`, () => {
      const source = fs.readFileSync(indexPath).toString();
      const $ = cheerio.load(source);

      $('script').each((_, el) => {
        const src = $(el).attr('src');

        if (protocolRegex.test(src)) {
          test('External library is not in allow list', () => {
            expect(externalAllowList).toContain(src);
          });
        } else {
          test(`File "${src}" is referenced by a <script> tag but missing`, () => {
            const localFilePath = path.join(dir, src);
            expect(fs.existsSync(localFilePath)).toBe(true);
          });
        }
      });
    });
  });
});

describe('Lint examples`', () => {
  glob.sync('content/examples/*/*/').forEach((exampleDir) => {
    const chapter = Number(exampleDir.split('/').at(-2).split('_')[0]);
    const linter = getLinter('examples', chapter);

    test(editorUrls.get(exampleDir), async () => {
      const res = await linter.lintFiles(path.join(exampleDir, '/**/*.js'));

      const errors = res
        .filter((r) => r.errorCount > 0)
        .flatMap((r) => {
          const filepath = path.join(
            exampleDir,
            path.relative(exampleDir, r.filePath),
          );
          return r.messages.map(
            (m) => `${filepath}:${m.line} | ${m.ruleId} | ${m.message}`,
          );
        });

      expect(errors).toEqual([]);
    });
  });
});
