import test from 'tape';
import { transform } from './index.mjs';

test('Equation', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'equation',
        equation: {
          expression: 'e=mc^2',
        },
      },
    ]),
    '<div data-type="equation">e=mc^2</div>',
    'should transform an equation block',
  );

  t.end();
});

test('Equation', (t) => {
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
              type: 'equation',
              equation: {
                expression: '\frac{{ - b pm sqrt {b^2 - 4ac} }}{{2a}}',
              },
            },
          ],
        },
      },
    ]),
    '<p>This is a test <span data-type="equation">\frac{{ - b pm sqrt {b^2 - 4ac} }}{{2a}}</span></p>',
    'should transform an inline equation',
  );

  t.end();
});
