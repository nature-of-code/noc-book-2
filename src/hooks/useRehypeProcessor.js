import { createElement, Fragment, useEffect, useState } from 'react';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';

import Image from '../components/Image';
import Example from '../components/Example';

export function useRehypeProcessor({ html, images }) {
  const [Content, setContent] = useState(Fragment);

  useEffect(() => {
    const replaceImages = () => (tree) => {
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
    };

    unified()
      .use(rehypeParse, { fragment: true })
      .use(replaceImages)
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          'gatsby-image': Image,
          'embed-example': Example,
        },
      })
      .process(html)
      .then((file) => {
        setContent(file.result);
      });
  }, [html, images]);

  return Content;
}
