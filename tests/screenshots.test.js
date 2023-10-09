const fs = require('node:fs');
const glob = require('glob');
const path = require('node:path');
const sharp = require('sharp');
const { getEditorUrls } = require('./utils');

const editorUrls = getEditorUrls();

// ---

const exceptions = new Map([
  ['figure_4_8_image', [1280, 480]],
  ['figure_4_8_circles', [1280, 480]],
  ['figure_i_2_bell_curve', [1440, 480]],
]);

describe('Validate examples screenshots`', () => {
  const createCanvasRegex = /\s*createCanvas\(\s*(\d+)\s*,\s*(\d+)/;

  glob.sync('content/examples/*/*/').forEach((exampleDir) => {
    describe(`${exampleDir} | ${editorUrls.get(exampleDir)}`, () => {
      test('`screenshot.png` should exist and be @2x compared to the p5 sketch canvas', async () => {
        const screenshotPath = path.join(exampleDir, 'screenshot.png');
        expect(fs.existsSync(screenshotPath)).toBe(true);

        let expectedWidth;
        let expectedHeight;
        const dirName = path.basename(exampleDir);

        if (exceptions.has(dirName)) {
          // use the dimensions from the `exceptions` map
          [expectedWidth, expectedHeight] = exceptions.get(dirName);
        } else {
          // extract the sketch canvas dimensions from the `createCanvas()` function call in `sketch.js`
          const sketchFilePath = path.join(exampleDir, 'sketch.js');
          const sketchFile = fs.readFileSync(sketchFilePath).toString();
          const canvasSize = createCanvasRegex.exec(sketchFile);
          expectedWidth = Number(canvasSize[1]) * 2;
          expectedHeight = Number(canvasSize[2]) * 2;
        }

        // get the actual dimensions of the screenshot
        const { width, height } = await sharp(screenshotPath).metadata();

        expect(`${width}x${height}`).toEqual(
          `${expectedWidth}x${expectedHeight}`,
        );
      });
    });
  });
});
