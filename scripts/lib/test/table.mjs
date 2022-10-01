import test from 'tape';
import { transform } from './index.mjs';

test('Table', (t) => {
  t.deepEqual(
    transform([
      {
        has_children: true,
        type: 'table',
        table: {
          table_width: 2,
          has_column_header: true,
          has_row_header: false,
        },
        children: [
          {
            has_children: false,
            type: 'table_row',
            table_row: {
              cells: [
                [
                  {
                    type: 'text',
                    text: {
                      content: 'Flip 1',
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
                    plain_text: 'Flip 1',
                    href: null,
                  },
                ],
                [
                  {
                    type: 'text',
                    text: {
                      content: 'Flip 2',
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
                    plain_text: 'Flip 2',
                    href: null,
                  },
                ],
              ],
            },
          },
          {
            has_children: false,
            type: 'table_row',
            table_row: {
              cells: [
                [
                  {
                    type: 'text',
                    text: {
                      content: 'Heads',
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
                    plain_text: 'Heads',
                    href: null,
                  },
                ],
                [
                  {
                    type: 'text',
                    text: {
                      content: 'Tails ',
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
                    plain_text: 'Tails ',
                    href: null,
                  },
                  {
                    type: 'text',
                    text: {
                      content: 'Up',
                      link: null,
                    },
                    annotations: {
                      bold: false,
                      italic: true,
                      strikethrough: false,
                      underline: false,
                      code: false,
                      color: 'default',
                    },
                    plain_text: 'Up',
                    href: null,
                  },
                ],
              ],
            },
          },
        ],
      },
    ]),
    '<table><thead><tr><th>Flip 1</th><th>Flip 2</th></tr></thead><tbody><tr><td>Heads</td><td>Tails <em>Up</em></td></tr></tbody></table>',
    'should transform a table with rich text',
  );

  t.end();
});
