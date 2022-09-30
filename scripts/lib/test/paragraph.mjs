import test from 'tape';
import { transform } from './index.mjs';

test('Paragraph', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'This is a test',
                link: null,
              },
              annotations: {
                bold: true,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'This is a test',
              href: null,
            },
          ],
        },
      },
    ]),
    '<p><strong>This is a test</strong></p>',
    'should transform paragraph with styles.',
  );

  t.end();
});

test('Paragraph with Ext Link', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'This is a test ',
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
              plain_text: 'This is a test ',
              href: null,
            },
            {
              type: 'text',
              text: {
                content: 'link',
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
              plain_text: 'link',
              href: 'https://example.com',
            },
          ],
        },
      },
    ]),
    '<p>This is a test <a href="https://example.com">link</a></p>',
    'should return a paragraph with external link.',
  );

  t.end();
});
