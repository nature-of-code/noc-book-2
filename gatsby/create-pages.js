const path = require('path');

module.exports = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allChaptersJson {
        edges {
          node {
            slug
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
  const pages = result.data.allChaptersJson.edges;

  pages.forEach(({ node }) => {
    createPage({
      path: `/${node.slug}/`,
      component: path.resolve(`./src/layouts/ChapterLayout.js`),
      context: {
        id: node.id,
      },
    });
  });
};
