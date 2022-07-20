import { Client } from '@notionhq/client';
import 'dotenv/config';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function fetchPages({ databaseId }) {
  console.log('Querying', databaseId);
  const { results: pages } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Status',
      select: {
        equals: 'Published',
      },
    },
  });

  for (let i = 0; i < pages.length; i++) {
    const { results: values } = await notion.pages.properties.retrieve({
      page_id: pages[i].id,
      property_id: 'title',
    });
    pages[i].title = values[0].title.text.content;
  }

  return pages;
}

export async function fetchBlockChildren({
  blockId,
  startCursor,
  recursive = false,
}) {
  console.log('Fetching', blockId, startCursor ? `@ ${startCursor}` : '');
  const response = await notion.blocks.children.list({
    block_id: blockId,
    start_cursor: startCursor,
    page_size: 100,
  });

  const blockChildren = response.results;

  if (!recursive) return blockChildren;

  for (let i = 0; i < blockChildren.length; i++) {
    if (blockChildren[i].has_children) {
      blockChildren[i].children = await fetchBlockChildren({
        blockId: blockChildren[i].id,
        recursive: true,
      });
    }
  }

  if (response.has_more) {
    const nextBlockChildren = await fetchBlockChildren({
      blockId,
      startCursor: response.next_cursor,
      recursive: true,
    });

    blockChildren.push(...nextBlockChildren);
  }

  return blockChildren;
}
