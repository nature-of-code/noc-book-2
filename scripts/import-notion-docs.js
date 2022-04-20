import { promises as fs } from 'fs';
import { snakeCase } from 'lodash-es';
import { toHtml } from 'hast-util-to-html';
import rehypeFormat from 'rehype-format';

import { getPageId, fetchBlockChildren } from './lib/notion-api.js';
import { fromNotion } from './lib/hast-from-notion.js';

const DESTINATION_FOLDER = 'src/chapter-content/';
const ROOT_BLOCK_NAME = 'Content';

const formatHast = rehypeFormat();

main();

async function main() {
  console.log(`Deleting ${DESTINATION_FOLDER}`);
  await fs.rmdir(DESTINATION_FOLDER, { recursive: true });

  console.log(`Creating ${DESTINATION_FOLDER}`);
  await fs.mkdir(DESTINATION_FOLDER, {});

  const rootId = await getPageId(ROOT_BLOCK_NAME);
  const rootContent = await fetchBlockChildren({
    blockId: rootId,
  });

  // Import all pages under the root page
  rootContent
    .filter((block) => block.type === 'child_page')
    .forEach(async (page) => {
      await importPage({
        pageId: page.id,
        title: page.child_page.title,
      });
    });
}

async function importPage({ pageId, title }) {
  // Get all page content recursively
  const pageContent = await fetchBlockChildren({
    blockId: pageId,
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
