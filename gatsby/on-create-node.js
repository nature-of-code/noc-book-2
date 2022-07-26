module.exports = async ({ node, actions, loadNodeContent }) => {
  const { createNodeField } = actions;

  if (node.internal.mediaType !== `text/html`) {
    return;
  }

  // load the html source to every HTML file node
  const content = await loadNodeContent(node);
  createNodeField({
    node,
    name: 'html',
    value: content,
  });
};
