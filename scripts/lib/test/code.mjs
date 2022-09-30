import test from 'tape';
import { transform } from './index.mjs';

test('Code Block', (t) => {
  t.deepEqual(
    transform([
      {
        type: 'code',
        code: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'const a = 3',
              },
            },
          ],
          language: 'javascript',
        },
      },
    ]),
    '<pre class="codesplit" data-code-language="javascript">const a = 3</pre>',
    'should transform code blocks to pre.codesplit',
  );

  t.end();
});
