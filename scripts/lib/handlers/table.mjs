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
            h('td', cell.map(transformRichText)),
          ),
        );
      }),
    ),
  ]);
  parent.children.push(node);

  return null;
}
