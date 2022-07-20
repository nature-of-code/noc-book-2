import { promises as fs } from 'fs';
import { snakeCase } from 'lodash-es';
import { toHtml } from 'hast-util-to-html';
import rehypeFormat from 'rehype-format';

import { fetchPages, fetchBlockChildren } from './lib/notion-api.mjs';
import { fromNotion } from './lib/hast-from-notion.mjs';

const DESTINATION_FOLDER = 'content/';

const formatHast = rehypeFormat();

main();

async function main() {
  console.log(`Deleting ${DESTINATION_FOLDER}`);
  await fs.rmdir(DESTINATION_FOLDER, { recursive: true });

  console.log(`Creating ${DESTINATION_FOLDER}`);
  await fs.mkdir(DESTINATION_FOLDER, {});

  const pages = await fetchPages({
    databaseId: process.env.NOTION_DATABASE_ID,
  });

  // Import all pages
  return Promise.all(pages.map(importPage));
}

async function importPage({ id, title }) {
  // Get all page content recursively
  const pageContent = await fetchBlockChildren({
    blockId: id,
    recursive: true,
  });

  // Transform Notion content to hast
  const hast = fromNotion(pageContent, title);

  // Format using plugin
  formatHast(hast);

  const fileName = `${snakeCase(title)}.html`;
  console.log('Creating file', fileName);
  await fs.writeFile(`${DESTINATION_FOLDER}/${fileName}`, toHtml(hast));
}
