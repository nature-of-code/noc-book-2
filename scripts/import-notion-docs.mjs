import { promises as fs, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { toHtml } from 'hast-util-to-html';
import { visit } from 'unist-util-visit';
import rehypeFormat from 'rehype-format';
import fetch from 'node-fetch';

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
  const chapters = pages.map((page) => {
    return {
      title: page.properties['Title'],
      src: `./${page.properties['File Name']}.html`,
      slug: page.properties['Slug'] || page.properties['File Name'],
    };
  });

  await fs.writeFile(
    `${DESTINATION_FOLDER}/chapters.json`,
    JSON.stringify(chapters),
  );
}

async function downloadImage({ url, name, dir }) {
  const streamPipeline = promisify(pipeline);

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  const contentType = response.headers.get('Content-Type');
  let ext;
  if (contentType === 'image/jpeg') ext = 'jpg';
  if (contentType === 'image/png') ext = 'png';

  const relativePath = `${dir}${name}.${ext}`;
  await streamPipeline(
    response.body,
    createWriteStream(`${DESTINATION_FOLDER}${relativePath}`),
  );

  return relativePath;
}

async function importPage({ id, properties }) {
  // Get all page content recursively
  const pageContent = await fetchBlockChildren({
    blockId: id,
    recursive: true,
  });

  // Transform Notion content to hast
  const hast = fromNotion(pageContent, properties['Title']);

  // Count all images and numbering
  let images = [];
  visit(hast, { tagName: 'img' }, async (node, _, parent) => {
    images.push([node, parent]);
  });

  // Create sub directory & Download all images
  const dir = `images/${properties['File Name']}/`;
  await fs.mkdir(`${DESTINATION_FOLDER}${dir}`, { recursive: true });

  await Promise.all(
    images.map(async ([node], index) => {
      const name = `${properties['File Name']}_${index + 1}`;

      const relativePath = await downloadImage({
        url: node.properties.src,
        dir,
        name,
      });
      node.properties.src = relativePath;
    }),
  );

  // Format using plugin
  formatHast(hast);

  const fileName = `${properties['File Name']}.html`;
  console.log('Creating file', fileName);
  await fs.writeFile(`${DESTINATION_FOLDER}/${fileName}`, toHtml(hast));
}
