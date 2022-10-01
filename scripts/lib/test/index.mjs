import { convert } from '../hast-from-notion.mjs';
import { toHtml } from 'hast-util-to-html';

export const transform = (n) => toHtml(convert(n));

import './heading.mjs';
import './paragraph.mjs';
import './list.mjs';
import './image.mjs';
import './quote.mjs';
import './code.mjs';
import './equation.mjs';
import './table.mjs';
import './column.mjs';
import './callout.mjs';

import './error.mjs';
