import test from 'tape';
import { transform } from './index.mjs';

test('Heading', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'heading_2',
        heading_2: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'hello',
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
              plain_text: 'hello',
              href: null,
            },
          ],
        },
      },
    ]),
    '<h2>hello</h2>',
    'should transform heading_2 to h2 element.',
  );

  t.end();
});

test('Heading', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'heading_3',
        heading_3: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'world',
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
              plain_text: 'world',
              href: null,
            },
          ],
        },
      },
    ]),
    '<h3>world</h3>',
    'should transform heading_3 to h3 element.',
  );

  t.end();
});
