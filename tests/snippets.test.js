const cheerio = require('cheerio');
const fs = require('node:fs');
const glob = require('glob');
const path = require('node:path');
const { getLinter } = require('./linter');

const transforms = [
  // isolated method
  (code) => `class TestWrapper { ${code} }`,
  (code) => `class TestWrapper { ${code} } }`,
  (code) => `class TestWrapper { ${code}`,

  // isolated function body with return statement
  (code) => `function testFunction() { ${code} }`,
  (code) => `function testFunction() { ${code}`,

  // missing closing brackets
  (code) => `${code} }`,
  (code) => `${code} } }`,

  // extra closing brackets
  (code) => code.replace(/(\})\s*$/g, ''),
  (code) => code.replace(/(\}\s*\})\s*$/g, ''),
];

async function lintSnippet(linter, code) {
  // 1) try as-is
  let res = await linter.lintText(code);
  if (res[0].fatalErrorCount === 0) return res;

  // 2) remove common problems and mutate the code string

  // strip start/end ellipsis that indicate a fragment
  code = code.replace(/^\s*(\.\.\.)/g, '');
  code = code.replace(/(\.\.\.)\s*$/g, '');

  // replace known descriptive text inside snippets
  code = code.replaceAll(/(\?\?\?+)/gm, 'undefined'); // 3+ consecutive question marks
  code = code.replaceAll('some fancy calculations', 'undefined');
  code = code.replaceAll('some value that increments slowly', '0');
  code = code.replaceAll('_______________?', 'undefined');

  res = await linter.lintText(code);
  if (res[0].fatalErrorCount === 0) return res;

  // 3) try isolated transforms
  for (const transform of transforms) {
    const transformedRes = await linter.lintText(transform(code));
    if (transformedRes[0].fatalErrorCount === 0) return transformedRes;
  }

  // we did not manage to heal the snippet, return step 2) results
  return res;
}

// ---

describe('Lint embedded code snippets`', () => {
  glob.sync('content/*.html').forEach((htmlFilePath) => {
    const chapter = Number(path.parse(htmlFilePath).name.split('_')[0]);
    const linter = getLinter('snippets', chapter);

    const source = fs.readFileSync(htmlFilePath).toString();
    const $ = cheerio.load(source, {
      withStartIndices: true,
      xmlMode: true,
    });

    $('[data-code-language="javascript"]').each((_, el) => {
      const $el = $(el);

      const lineNumber = source
        .substring(0, $el.get(0).startIndex)
        .split('\n').length;

      const code = $el.text();

      test(`${htmlFilePath}:${lineNumber}`, async () => {
        let res = await lintSnippet(linter, code);

        const errors = res
          .filter((r) => r.errorCount > 0)
          .flatMap((r) =>
            r.messages.map(
              (m) =>
                `${htmlFilePath}:${lineNumber + m.line - 1} - Line ${
                  m.line
                } | ${m.ruleId} | ${m.message}`,
            ),
          );

        expect(errors).toEqual([]);
      });
    });
  });
});
