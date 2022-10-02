import { promises as fs } from 'node:fs';
import { toHtml } from 'hast-util-to-html';
import rehypeFormat from 'rehype-format';

import { fetchPages, fetchBlockChildren } from './lib/notion-api.mjs';
import { fromNotion } from './lib/hast-from-notion.mjs';
import { importExamples } from './lib/import-examples.mjs';
import { importImages } from './lib/import-images.mjs';

import { DESTINATION_FOLDER } from './config.mjs';
const PROPERTY_KEYS = ['Title', 'File Name', 'Slug', 'Type'];

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
    sorts: [
      {
        property: 'File Name',
        direction: 'ascending',
      },
    ],
  });

  // Import db & all pages
  await importDatabase(pages);
  return Promise.all(pages.map(importPage));
}

async function importDatabase(pages) {
  const chapters = pages.map((page) => {
    return {
      title: page.properties['Title'],
      src: `./${page.properties['File Name']}.html`,
      slug: page.properties['Slug'] || page.properties['File Name'],
    };
  });

  await fs.writeFile(
    `${DESTINATION_FOLDER}chapters.json`,
    JSON.stringify(chapters),
  );
}

async function importPage({ id, properties }) {
  // Get all page content recursively
  const pageContent = await fetchBlockChildren({
    blockId: id,
    recursive: true,
  });

  // Transform Notion content to hast
  const pageTitle =
    properties['Type'] === 'Chapter'
      ? `Chapter ${properties['Title']}`
      : properties['Title'];
  const hast = fromNotion(pageContent, pageTitle);

  // Import images & examples to local folders
  await importImages({
    hast,
    slug: properties['File Name'],
  });
  await importExamples({
    hast,
    slug: properties['File Name'],
  });

  // Format using plugin
  formatHast(hast);

  const fileName = `${properties['File Name']}.html`;
  console.log('Creating file', fileName);
  await fs.writeFile(`${DESTINATION_FOLDER}${fileName}`, toHtml(hast));
}
