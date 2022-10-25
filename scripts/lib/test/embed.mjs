import test from 'tape';
import { transform } from './index.mjs';

test('Embedded Sketch', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'bookmark',
        bookmark: {
          caption: [],
          url: 'https://editor.p5js.org/natureofcode/sketches/5C69XyrlsR',
        },
      },
    ]),
    '<div data-type="embed" data-p5-editor="https://editor.p5js.org/natureofcode/sketches/5C69XyrlsR"></div>',
    'should return an embedded example sketch',
  );

  t.end();
});
