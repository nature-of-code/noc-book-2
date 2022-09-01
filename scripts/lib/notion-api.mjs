import { Client } from '@notionhq/client';
import 'dotenv/config';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function fetchPages({ databaseId, propertyKeys, filter, sorts }) {
  console.log('Querying', databaseId);
  const { results: pages } = await notion.databases.query({
    database_id: databaseId,
    filter,
    sorts,
  });

  /**
   *
   * @param {property_item | property_list} property
   * @returns {String}
   */
  function getPropertyValue(property) {
    if (property.object === 'list') {
      return property.results.map(getPropertyValue).join('');
    }
    switch (property.type) {
      case 'select':
        return property['select'].name;
      case 'title':
        return property['title'].text.content;
      case 'rich_text':
        return property['rich_text'].text.content;
      default:
        throw new Error('property type not supported');
    }
  }

  // fetch and add properties
  for (let i = 0; i < pages.length; i++) {
    for (let key of propertyKeys) {
      let propertyId = pages[i].properties[key]?.id;
      assert(propertyId, 'property does not exist.');

      const response = await notion.pages.properties.retrieve({
        page_id: pages[i].id,
        property_id: propertyId,
      });

      pages[i].properties[key] = getPropertyValue(response);
    }
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

class AssertionError extends Error {}

function assert(value, message) {
  if (!value) throw new AssertionError(message);
}
