import test from 'tape';
import { transform } from './index.mjs';

test('Column', (t) => {
  t.deepEqual(
    transform([
      {
        has_children: true,
        type: 'column_list',
        column_list: {},
        children: [
          {
            has_children: true,
            type: 'column',
            column: {},
            children: [
              {
                has_children: false,
                type: 'paragraph',
                paragraph: {
                  rich_text: [
                    {
                      type: 'text',
                      text: {
                        content: 'left',
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
                      plain_text: 'left',
                      href: null,
                    },
                  ],
                  color: 'default',
                },
              },
            ],
          },
          {
            has_children: true,
            type: 'column',
            column: {},
            children: [
              {
                has_children: false,
                type: 'paragraph',
                paragraph: {
                  rich_text: [
                    {
                      type: 'text',
                      text: {
                        content: 'right',
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
                      plain_text: 'right',
                      href: null,
                    },
                  ],
                  color: 'default',
                },
              },
            ],
          },
        ],
      },
    ]),
    '<div class="col-list"><div><p>left</p></div><div><p>right</p></div></div>',
    'should return a column list with two columns',
  );

  t.end();
});
