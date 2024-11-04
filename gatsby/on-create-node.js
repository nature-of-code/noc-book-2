const PRESERVED_SLUGS = require('./preserved-slugs');

module.exports = async ({
  node,
  actions,
  loadNodeContent,
  createContentDigest,
  createNodeId,
}) => {
  const { createNodeField, createNode, createParentChildLink, deleteNode } =
    actions;

  // Check the BookSection node
  if (node.internal.type === 'BookSection') {
    // mark the preserved one which has the same name as an existing page
    createNodeField({
      node,
      name: 'isPreserved',
      value: PRESERVED_SLUGS.includes(node.slug),
    });
  }

  if (node.internal.mediaType !== `text/html`) {
    return;
  }

  const { parseContent } = await import('./lib/parse-content.mjs');

  // load the html source to every HTML file node
  const content = await loadNodeContent(node);
  const { ast, toc, examples, exercises, description } = parseContent(content);

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

  createNodeField({
    node,
    name: 'description',
    value: description,
  });

  for (let example of examples) {
    const exampleNode = {
      id: createNodeId(example.relativeDirectory),
      parent: node.id,
      internal: {
        type: 'Example',
        contentDigest: createContentDigest(example),
      },
      ...example,
    };

    createNode(exampleNode);
    createParentChildLink({ parent: node, child: exampleNode });
  }

  for (let exercise of exercises) {
    const exerciseNode = {
      id: createNodeId(exercise.relativeDirectory),
      parent: node.id,
      internal: {
        type: 'Exercise',
        contentDigest: createContentDigest(exercise),
      },
      ...exercise,
    };

    createNode(exerciseNode);
    createParentChildLink({ parent: node, child: exerciseNode });
  }
};
