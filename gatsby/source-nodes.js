const fs = require('fs/promises');
const path = require('path');

const CONTENT_DIR = 'content/';

module.exports = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  const { convert } = await import('./lib/convert-file.mjs');

  const fileNames = await fs.readdir(CONTENT_DIR);

  await Promise.all(fileNames.map(importFile));

  async function importFile(fileName, index) {
    const html = String(await fs.readFile(path.resolve(CONTENT_DIR, fileName)));
    const content = convert(html);

    const node = {
      id: createNodeId(`source-remark-${fileName}`),
      parent: null,
      children: [],
      title: fileName.split('.html')[0],
      internal: {
        type: `SourceRemark`,
        mediaType: 'text/markdown',
        content: String(content),
        contentDigest: createContentDigest(content),
      },
    };

    createNode(node);
  }
};
