const fs = require('node:fs');
const glob = require('glob');
const path = require('node:path');
const sharp = require('sharp');
const { getEditorUrls } = require('./utils');

const editorUrls = getEditorUrls();

// ---

describe('Validate examples screenshots`', () => {
  const createCanvasRegex = /\s*createCanvas\(\s*(\d+)\s*,\s*(\d+)/;

  glob.sync('content/examples/*/*/').forEach((exampleDir) => {
    describe(`${exampleDir} | ${editorUrls.get(exampleDir)}`, () => {
      test('`screenshot.png` should exist and be @2x compared to the p5 sketch canvas', async () => {
        const screenshotPath = path.join(exampleDir, 'screenshot.png');
        expect(fs.existsSync(screenshotPath)).toBe(true);

        // extract the sketch canvas dimensions from the `createCanvas()` function call in `sketch.js`
        const sketchFilePath = path.join(exampleDir, 'sketch.js');
        const sketchFile = fs.readFileSync(sketchFilePath).toString();
        const canvasSize = createCanvasRegex.exec(sketchFile);
        const expectedWidth = Number(canvasSize[1]) * 2;
        const expectedHeight = Number(canvasSize[2]) * 2;

        // get the actual dimensions of the screenshot
        const { width, height } = await sharp(screenshotPath).metadata();

        expect(`${width}x${height}`).toEqual(
          `${expectedWidth}x${expectedHeight}`,
        );
      });
    });
  });
});
