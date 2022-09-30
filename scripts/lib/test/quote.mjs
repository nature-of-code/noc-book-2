import test from 'tape';
import { transform } from './index.mjs';

test('Quote', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'quote',
        has_children: true,
        children: [
          {
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'the ',
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
                  plain_text: 'the ',
                  href: null,
                },
                {
                  type: 'text',
                  text: {
                    content: 'second',
                    link: null,
                  },
                  annotations: {
                    bold: true,
                    italic: true,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: 'default',
                  },
                  plain_text: 'second',
                  href: null,
                },
                {
                  type: 'text',
                  text: {
                    content: ' line of quote',
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
                  plain_text: ' line of quote',
                  href: null,
                },
              ],
            },
          },
        ],
        quote: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'quote test',
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
              plain_text: 'quote test',
              href: null,
            },
          ],
        },
      },
    ]),
    '<blockquote data-type="epigraph"><p>quote test</p><p>the <strong><em>second</em></strong> line of quote</p></blockquote>',
    'should return a two line quote with styles.',
  );

  t.end();
});
