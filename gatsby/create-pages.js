const path = require('path');

module.exports = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allChaptersJson {
        edges {
          previous {
            id
          }
          node {
            slug
            id
          }
          next {
            id
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create a page for each chapter
  const chapters = result.data.allChaptersJson.edges;

  if (chapters.length > 0) {
    chapters.forEach(({ previous, node, next }) => {
      const previousId = previous === null ? null : previous.id;
      const nextId = next === null ? null : next.id;

      createPage({
        path: `/${node.slug}/`,
        component: path.resolve(`./src/layouts/ChapterLayout.js`),
        context: {
          id: node.id,
          previousId,
          nextId,
        },
      });
    });
  }

  // Create the example page (contains every embedded sketch with screenshot)
  if (process.env.CREATE_EXAMPLES_PAGE === 'true') {
    createPage({
      path: '/examples',
      component: path.resolve(`./src/layouts/ExamplesPageLayout.js`),
    });
  }
};
