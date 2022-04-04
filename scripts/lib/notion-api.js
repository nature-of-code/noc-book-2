import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getPageId(query) {
  const response = await notion.search({ query });
  if (!response.results.length) {
    throw `"${blockName}" not found`;
  }

  return response.results[0].id;
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
