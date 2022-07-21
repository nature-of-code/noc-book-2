const path = require('path');

exports.sourceNodes = require('./gatsby/source-nodes.js');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            parent {
              ... on SourceRemark {
                title
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges;

  // you'll call `createPage` for each result
  posts.forEach(({ node }) => {
    createPage({
      path: `/${node.parent.title}/`,
      component: path.resolve(`./src/layouts/PostLayout.js`),
      context: {
        id: node.id,
      },
    });
  });
};
