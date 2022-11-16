import { h } from 'hastscript';
import { transformRichText } from './rich-text.mjs';

export function table(block, parent) {
  const tableRows = block.children;
  let tableHead = null;
  if (block.table.has_column_header) {
    tableHead = tableRows[0];
    tableRows.shift();
  }

  const node = h('table', [
    tableHead &&
      h(
        'thead',
        h(
          'tr',
          tableHead.table_row.cells.map((cell) =>
            h('th', cell.map(transformRichText)),
          ),
        ),
      ),
    h(
      'tbody',
      tableRows.map((row) => {
        return h(
          'tr',
          row.table_row.cells.map((cell) =>
            h(
              'td',
              cell.map((richText) => {
                if (
                  richText.type === 'text' &&
                  richText.annotations?.code &&
                  richText.text.content.indexOf('//{block}') === 0
                ) {
                  const content = richText.text.content
                    .split('//{block}')[1]
                    .trim();
                  return h(
                    'pre',
                    {
                      class: 'codesplit',
                      dataCodeLanguage: 'javascript',
                    },
                    content,
                  );
                }
                return transformRichText(richText);
              }),
            ),
          ),
        );
      }),
    ),
  ]);
  parent.children.push(node);

  return null;
}
