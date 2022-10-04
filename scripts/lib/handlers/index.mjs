import { heading } from './heading.mjs';
import { paragraph } from './paragraph.mjs';
import { quote } from './quote.mjs';
import { list } from './list.mjs';
import { image } from './image.mjs';
import { callout } from './callout.mjs';
import { table } from './table.mjs';
import { code } from './code.mjs';
import { equation } from './equation.mjs';
import { column, column_list } from './column.mjs';
import { bookmark } from './bookmark.mjs';

function skip() {
  return null;
}

export const handlers = {
  heading_2: heading('h2'),
  heading_3: heading('h3'),
  paragraph,
  quote,
  numbered_list_item: list('ol'),
  bulleted_list_item: list('ul'),
  image,
  table,
  callout,
  code,
  equation,
  bookmark,
  column,
  column_list,
};
