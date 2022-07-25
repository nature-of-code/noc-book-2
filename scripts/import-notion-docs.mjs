import { promises as fs } from 'fs';
import { toHtml } from 'hast-util-to-html';
import rehypeFormat from 'rehype-format';

import { fetchPages, fetchBlockChildren } from './lib/notion-api.mjs';
import { fromNotion } from './lib/hast-from-notion.mjs';

const DESTINATION_FOLDER = 'content/';
const PROPERTY_KEYS = ['Title', 'File Name', 'Slug'];

const formatHast = rehypeFormat();

main();

async function main() {
  console.log(`Deleting ${DESTINATION_FOLDER}`);
  await fs.rmdir(DESTINATION_FOLDER, { recursive: true });

  console.log(`Creating ${DESTINATION_FOLDER}`);
  await fs.mkdir(DESTINATION_FOLDER, {});

  const pages = await fetchPages({
    databaseId: process.env.NOTION_DATABASE_ID,
    propertyKeys: PROPERTY_KEYS,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
    },
  });

  // Import db & all pages
  await importDatabase(pages);
  return Promise.all(pages.map(importPage));
}

async function importDatabase(pages) {
  const db = {
    pages: pages.map((page) => {
      return {
        title: page.properties['Title'],
        src: `./${page.properties['File Name']}.html`,
        slug: page.properties['Slug'],
      };
    }),
  };

  await fs.writeFile(`${DESTINATION_FOLDER}/db.json`, JSON.stringify(db));
}

async function importPage({ id, properties }) {
  // Get all page content recursively
  const pageContent = await fetchBlockChildren({
    blockId: id,
    recursive: true,
  });

  // Transform Notion content to hast
  const hast = fromNotion(pageContent, properties['Title']);

  // Format using plugin
  formatHast(hast);

  const fileName = `${properties['File Name']}.html`;
  console.log('Creating file', fileName);
  await fs.writeFile(`${DESTINATION_FOLDER}/${fileName}`, toHtml(hast));
}
