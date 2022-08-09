import { createElement, Fragment } from 'react';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';

import Image from '../components/Image';
import Example from '../components/Example';
import Highlight from '../components/Highlight';

export function transformContent({ html, images }) {
  const replaceMedia = () => (tree) => {
    visit(tree, { tagName: 'img' }, (node, index, parent) => {
      const relativePath = node.properties.src;
      // If the image src exist as a local file
      // use Gatsby Image to handle
      const imageSharp = images.find(
        (image) => image.relativePath === relativePath,
      );
      if (imageSharp) {
        node.tagName = 'gatsby-image';
        node.properties.image = imageSharp;
      }
    });
    visit(tree, { tagName: 'div' }, (node, index, parent) => {
      if (
        node.properties.dataType === 'example' &&
        node.properties.dataExamplePath
      ) {
        node.tagName = 'embed-example';
      }
    });
    visit(tree, { tagName: 'span' }, (node, index, parent) => {
      if (
        node.properties.className &&
        node.properties.className.includes('highlight')
      ) {
        node.tagName = 'highlight';
      }
    });
  };

  const processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(replaceMedia)
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        'gatsby-image': Image,
        'embed-example': Example,
        highlight: Highlight,
      },
    });

  return processor.processSync(html);
}
