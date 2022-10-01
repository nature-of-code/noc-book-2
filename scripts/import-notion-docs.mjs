import { promises as fs, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { toHtml } from 'hast-util-to-html';
import { visit } from 'unist-util-visit';
import rehypeFormat from 'rehype-format';
import fetch from 'node-fetch';
import { snakeCase } from 'lodash-es';

import { fetchPages, fetchBlockChildren } from './lib/notion-api.mjs';
import { fromNotion } from './lib/hast-from-notion.mjs';

const DESTINATION_FOLDER = 'content/';
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

async function downloadImage({ url, name, relativeDir, addExtension = true }) {
  const streamPipeline = promisify(pipeline);

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  const contentType = response.headers.get('Content-Type');
  let ext;
  if (contentType === 'image/jpeg') ext = 'jpg';
  if (contentType === 'image/png') ext = 'png';

  let relativePath = `${relativeDir}${name}`;
  if (addExtension) {
    relativePath += `.${ext}`;
  }

  await streamPipeline(
    response.body,
    createWriteStream(`${DESTINATION_FOLDER}${relativePath}`),
  );

  return relativePath;
}

async function importImages({ hast, slug }) {
  // Count all images
  let images = [];
  visit(hast, { tagName: 'img' }, async (node, _, parent) => {
    images.push(node);
  });

  // Create sub directory & Download all images
  const relativeDir = `images/${slug}/`;
  await fs.mkdir(`${DESTINATION_FOLDER}${relativeDir}`, { recursive: true });

  await Promise.all(
    images.map(async (node, index) => {
      const name = `${slug}_${index + 1}`;

      const relativePath = await downloadImage({
        url: node.properties.src,
        relativeDir,
        name,
      });
      node.properties.src = relativePath;
    }),
  );
}

async function downloadExample({ url, relativeDir }) {
  const response = await fetch(url);

  if (!response.ok) {
    console.warn(`unexpected response ${response.statusText}`);
    return null;
  }

  const data = await response.json();
  if (!data) return null;

  // recursively save files
  async function saveFile({ node, relativeDir }) {
    if (node.fileType === 'folder') {
      const folderName = node.name === 'root' ? '' : node.name;
      // create the folder
      await fs.mkdir(`${DESTINATION_FOLDER}${relativeDir}${folderName}/`, {
        recursive: true,
      });

      await Promise.all(
        node.children.map(async (childId) => {
          const childNode = data.files.find((file) => file.id === childId);
          // recursively save the children files (or folders)
          await saveFile({
            node: childNode,
            relativeDir: `${relativeDir}${folderName}/`,
          });
        }),
      );
    }

    if (node.fileType === 'file') {
      /**
       * * currently assuming non-text files are all images
       * TODO: will add support for other format when needed
       */
      if (!node.content && !!node.url) {
        await downloadImage({
          url: node.url,
          relativeDir,
          name: node.name,
          addExtension: false,
        });
      } else {
        await fs.writeFile(
          `${DESTINATION_FOLDER}${relativeDir}${node.name}`,
          node.content,
        );
      }
    }
  }

  const exampleDir = `${relativeDir}${snakeCase(data.name)}/`;
  await saveFile({
    node: data.files[0],
    relativeDir: exampleDir,
  });

  return exampleDir;
}

async function importExamples({ hast, slug }) {
  // Count all examples
  let examples = [];
  visit(
    hast,
    (node) => node.tagName === 'div' && node.properties.dataType === 'example',
    async (node, _, parent) => {
      if (!!node.properties.dataP5Editor) {
        examples.push([node, parent]);
      }
    },
  );

  // Download and save all examples
  const relativeDir = `examples/${slug}/`;
  await Promise.all(
    examples.map(async ([node], index) => {
      const exampleDir = await downloadExample({
        /**
         * modify URL to the api entry
         *
         * from:
         * https://editor.p5js.org/{username}/sketches/{id}
         * to:
         * https://editor.p5js.org/editor/{username}/projects/{id}
         */
        url: node.properties.dataP5Editor
          .replace('editor.p5js.org/', 'editor.p5js.org/editor/')
          .replace('sketches/', 'projects/'),
        relativeDir,
      });
      node.properties['data-example-path'] = exampleDir;
    }),
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
  await importImages({ hast, slug: properties['File Name'] });
  await importExamples({ hast, slug: properties['File Name'] });

  // Format using plugin
  formatHast(hast);

  const fileName = `${properties['File Name']}.html`;
  console.log('Creating file', fileName);
  await fs.writeFile(`${DESTINATION_FOLDER}${fileName}`, toHtml(hast));
}
