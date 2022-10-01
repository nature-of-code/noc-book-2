import test from 'tape';
import { transform } from './index.mjs';

test('Unordered List', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'bulleted_list_item',
        bulleted_list_item: {
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
      {
        type: 'bulleted_list_item',
        bulleted_list_item: {
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
    '<ul><li>hello</li><li>world</li></ul>',
    'should create an unordered list with two items.',
  );
  t.end();
});

test('Two List', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'bulleted_list_item',
        bulleted_list_item: {
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
      {
        type: 'numbered_list_item',
        numbered_list_item: {
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
    '<ul><li>hello</li></ul><ol><li>world</li></ol>',
    'should create two list with one item each.',
  );
  t.end();
});

test('Nested List', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'bulleted_list_item',
        has_children: true,
        children: [
          {
            type: 'numbered_list_item',
            numbered_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'a ',
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
                  plain_text: 'a ',
                  href: null,
                },
                {
                  type: 'text',
                  text: {
                    content: 'train',
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
                  plain_text: 'train',
                  href: null,
                },
              ],
            },
          },
        ],
        bulleted_list_item: {
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
      {
        type: 'bulleted_list_item',
        has_children: true,
        children: [
          {
            type: 'numbered_list_item',
            numbered_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'item 1',
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
                  plain_text: 'item 1',
                  href: null,
                },
              ],
            },
          },
          {
            type: 'numbered_list_item',
            numbered_list_item: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'item 2',
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
                  plain_text: 'item 2',
                  href: null,
                },
              ],
            },
          },
        ],
        bulleted_list_item: {
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
                code: true,
                color: 'default',
              },
              plain_text: 'world',
              href: null,
            },
          ],
        },
      },
    ]),
    '<ul><li>hello<ol><li>a <strong>train</strong></li></ol></li><li><code>world</code><ol><li>item 1</li><li>item 2</li></ol></li></ul>',
    'should create a nested list with text styles (bold / code).',
  );
  t.end();
});
