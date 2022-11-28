import test from 'tape';
import { transform } from './index.mjs';

test('Embedded Sketch', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'bookmark',
        bookmark: {
          caption: [
            {
              type: 'text',
              text: {
                content: 'Figure 1.2',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'Figure 1.2',
              href: null,
            },
          ],
          url: 'https://editor.p5js.org/natureofcode/sketches/5C69XyrlsR',
        },
      },
    ]),
    '<figure><div data-type="embed" data-p5-editor="https://editor.p5js.org/natureofcode/sketches/5C69XyrlsR"></div><figcaption>Figure 1.2</figcaption></figure>',
    'should return an embedded example sketch',
  );

  t.end();
});
