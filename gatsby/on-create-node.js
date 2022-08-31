module.exports = async ({ node, actions, loadNodeContent }) => {
  const { createNodeField } = actions;

  if (node.internal.mediaType !== `text/html`) {
    return;
  }

  const { parseContent } = await import('./lib/parse-content.mjs');

  // load the html source to every HTML file node
  const content = await loadNodeContent(node);
  const { ast, toc } = parseContent(content);

  createNodeField({
    node,
    name: 'htmlAst',
    value: JSON.stringify(ast),
  });

  createNodeField({
    node,
    name: 'toc',
    value: JSON.stringify(toc),
  });
};
