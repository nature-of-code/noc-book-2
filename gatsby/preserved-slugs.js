const fs = require('fs');
const path = require('path');

// Directory where your page files are stored
const PAGES_DIR = path.join(__dirname, '../src/pages');

function generatePreservedSlugs() {
  // Read all files in the pages directory
  const files = fs.readdirSync(PAGES_DIR);

  // Map filenames to slugs
  const slugs = files
    .filter((file) => file.endsWith('.js'))
    .map((file) => path.basename(file, path.extname(file)));

  console.log(slugs);

  return slugs;
}

module.exports = generatePreservedSlugs();
