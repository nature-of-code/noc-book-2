import test from 'tape';
import { transform } from './index.mjs';

test('Skip block', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'bookmark',
        bookmark: {
          caption: [],
          url: 'https://example.com',
        },
      },
    ]),
    '',
    'should skip a block',
  );

  t.end();
});

test('Unsupported block', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'abc',
        abc: {
          name: 'abc',
        },
      },
    ]),
    '',
    'should skip unsupported block',
  );

  t.end();
});

test('Unsupported rich text', (t) => {
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
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'This is a test',
              href: null,
            },
            {
              type: 'question',
              question: {
                content: 'This is a test',
                link: null,
              },
            },
          ],
        },
      },
    ]),
    '<p>This is a test</p>',
    'should skip unsupported rich text',
  );

  t.end();
});

test('Unsupported customized block', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'callout',
        callout: {
          rich_text: [],
          icon: { type: 'emoji', emoji: '🔥' },
        },
      },
    ]),
    '',
    'should skip unsupported callout block',
  );

  t.end();
});
