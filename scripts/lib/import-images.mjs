import { promises as fs, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import fetch from 'node-fetch';
import { visit } from 'unist-util-visit';

import { DESTINATION_FOLDER } from '../config.mjs';

async function downloadImage({ url, name, relativeDir }) {
  const streamPipeline = promisify(pipeline);

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`unexpected response ${response.statusText}`);

  let relativePath = path.join(relativeDir, name);

  // add extension name
  const contentType = response.headers.get('Content-Type');
  if (contentType === 'image/jpeg') relativePath += '.jpg';
  if (contentType === 'image/png') relativePath += '.png';

  await streamPipeline(
    response.body,
    createWriteStream(path.join(DESTINATION_FOLDER, relativePath)),
  );

  return relativePath;
}

export async function importImages({ hast, slug }) {
  // Count all images
  let images = [];
  visit(hast, { tagName: 'img' }, async (node) => {
    images.push(node);
  });

  // Create sub directory & Download all images
  const relativeDir = path.join('images/', slug);
  await fs.mkdir(path.join(DESTINATION_FOLDER, relativeDir), {
    recursive: true,
  });

  await Promise.all(
    images.map(async (node, index) => {
      const name = `${slug}_${index + 1}`;

      const relativePath = await downloadImage({
        url: node.properties.src,
        relativeDir,
        name,
      });
      node.properties.src = relativePath;
    }),
  );
}
