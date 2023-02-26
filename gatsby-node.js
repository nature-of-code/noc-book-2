const fs = require('fs-extra');
const express = require(`express`);

exports.onCreateNode = require('./gatsby/on-create-node.js');
exports.createPages = require('./gatsby/create-pages.js');
exports.createResolvers = require('./gatsby/create-resolvers.js');

// Enable development support for serving HTML from `./static` folder
exports.onCreateDevServer = ({ app }) => {
  app.use(express.static(`content`));
};

// Copy examples to the public folder
exports.onPostBuild = async () => {
  try {
    await fs.copy('content/examples', 'public/examples/');
  } catch (err) {
    console.error(err);
  }
};
