import test from 'tape';
import { transform } from './index.mjs';

test('Callout: Indexterm', (t) => {
  t.deepEqual(
    transform([
      {
        has_children: false,
        type: 'callout',
        callout: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'a / b / c',
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
              plain_text: 'a / b / c',
              href: null,
            },
          ],
          icon: { type: 'emoji', emoji: '🔗' },
          color: 'default',
        },
      },
    ]),
    '<a data-type="indexterm" data-primary="a" data-secondary="b" data-tertiary="c"></a>',
    'should return an indexterm <a> tag with three terms',
  );

  t.end();
});

test('Callout: Highlight', (t) => {
  t.deepEqual(
    transform([
      {
        has_children: false,
        type: 'callout',
        callout: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'An object at rest stays at rest',
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
              plain_text: 'An object at rest stays at rest',
            },
            {
              type: 'text',
              text: {
                content: ' and an object in motion stays in motion.',
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
              plain_text: ' and an object in motion stays in motion.',
            },
          ],
          icon: { type: 'emoji', emoji: '💡' },
          color: 'default',
        },
      },
    ]),
    '<p><span class="highlight"><strong>An object at rest stays at rest</strong> and an object in motion stays in motion.</span></p>',
    'should return a highlight div',
  );

  t.end();
});

test('Callout: Note', (t) => {
  t.deepEqual(
    transform([
      {
        has_children: false,
        type: 'callout',
        callout: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'text',
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
              plain_text: 'text',
            },
          ],
          icon: { type: 'emoji', emoji: '📒' },
          color: 'default',
        },
      },
    ]),
    '<div data-type="note"><h3>text</h3></div>',
    'should return a note div',
  );

  t.end();
});

test('Callout: Exercise', (t) => {
  t.deepEqual(
    transform([
      {
        has_children: false,
        type: 'callout',
        callout: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'text',
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
              plain_text: 'text',
            },
          ],
          icon: { type: 'emoji', emoji: '✏️' },
          color: 'default',
        },
      },
    ]),
    '<div data-type="exercise"><h3>text</h3></div>',
    'should return an exercise div',
  );

  t.end();
});

test('Callout: Project', (t) => {
  t.deepEqual(
    transform([
      {
        has_children: false,
        type: 'callout',
        callout: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'text',
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
              plain_text: 'text',
            },
          ],
          icon: { type: 'emoji', emoji: '🦎' },
          color: 'default',
        },
      },
    ]),
    '<div data-type="project"><h3>text</h3></div>',
    'should return a project div',
  );

  t.end();
});

test('Callout: Example', (t) => {
  t.deepEqual(
    transform([
      {
        has_children: true,
        type: 'callout',
        children: [
          {
            type: 'image',
            image: {
              type: 'external',
              external: {
                url: 'https://example.com/a.jpg',
              },
              caption: [
                {
                  type: 'text',
                  text: {
                    content: 'hello',
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
                  plain_text: 'hello',
                  href: null,
                },
              ],
            },
          },
        ],
        callout: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Example title',
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
              plain_text: 'Example title',
            },
          ],
          icon: { type: 'emoji', emoji: '💻' },
          color: 'default',
        },
      },
    ]),
    '<div><h3>Example title</h3><figure><img src="https://example.com/a.jpg" alt="hello"><figcaption><em>hello</em></figcaption></figure></div>',
    'should return an example div',
  );

  t.end();
});
