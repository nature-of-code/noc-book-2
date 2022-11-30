import { promises as fs, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import fetch from 'node-fetch';
import { visit } from 'unist-util-visit';
import { snakeCase } from 'lodash-es';
import { h } from 'hastscript';

import { DESTINATION_FOLDER } from '../config.mjs';

async function downloadAndSaveFile({ url, relativePath }) {
  const streamPipeline = promisify(pipeline);

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  await streamPipeline(
    response.body,
    createWriteStream(path.join(DESTINATION_FOLDER, relativePath)),
  );

  return relativePath;
}

async function downloadExample({ url, relativeDir }) {
  const response = await fetch(url);

  if (!response.ok) {
    console.warn(`unexpected response ${response.statusText}`);
    return null;
  }

  const data = await response.json();
  if (!data) return null;

  // recursively save files
  async function saveFile({ node, relativeDir }) {
    if (node.fileType === 'folder') {
      const folderName = node.name === 'root' ? '' : node.name;
      // create the folder
      await fs.mkdir(path.join(DESTINATION_FOLDER, relativeDir, folderName), {
        recursive: true,
      });

      await Promise.all(
        node.children.map(async (childId) => {
          const childNode = data.files.find((file) => file.id === childId);
          // recursively save the children files (or folders)
          await saveFile({
            node: childNode,
            relativeDir: path.join(relativeDir, folderName),
          });
        }),
      );
    }

    if (node.fileType === 'file') {
      if (node.content) {
        // if is a text file
        await fs.writeFile(
          path.join(DESTINATION_FOLDER, relativeDir, node.name),
          node.content,
        );
      } else {
        // if is an external file
        await downloadAndSaveFile({
          url: node.url,
          relativePath: path.join(relativeDir, node.name),
        });
      }
    }
  }

  const exampleDir = path.join(relativeDir, snakeCase(data.name));

  // return screenshot path if exist
  let screenshotPath = null;
  if (data.files.find((file) => file.name === 'screenshot.png')) {
    screenshotPath = path.join(exampleDir, 'screenshot.png');
  }

  await saveFile({
    node: data.files[0],
    relativeDir: exampleDir,
  });

  return { exampleDir, screenshotPath };
}

export async function importExamples({ hast, slug }) {
  // Count all examples
  const examples = [];
  visit(hast, { tagName: 'div' }, async (node) => {
    if (node.properties.dataType === 'embed' && node.properties.dataP5Editor) {
      examples.push(node);
    }
  });

  // Download and save all examples
  const relativeDir = path.join('examples/', slug);
  await Promise.all(
    examples.map(async (node) => {
      /**
       * modify URL to the api entry
       *
       * from:
       * https://editor.p5js.org/{username}/sketches/{id}
       * or https://editor.p5js.org/{username}/full/{id}
       *
       * to:
       * https://editor.p5js.org/editor/{username}/projects/{id}
       */
      const url = node.properties.dataP5Editor
        .replace('editor.p5js.org/', 'editor.p5js.org/editor/')
        .replace('sketches/', 'projects/')
        .replace('full/', 'projects/');

      const result = await downloadExample({
        url,
        relativeDir,
      });

      if (!result) return null;

      node.properties['data-example-path'] = result.exampleDir;
      if (result.screenshotPath) {
        node.children.push(h('img', { src: result.screenshotPath }));
      }
    }),
  );
}
