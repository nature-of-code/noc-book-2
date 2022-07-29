import { createElement, Fragment, useEffect, useState } from 'react';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';

import Image from '../components/Image';

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
    };

    unified()
      .use(rehypeParse, { fragment: true })
      .use(replaceImages)
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          'gatsby-image': Image,
        },
      })
      .process(html)
      .then((file) => {
        setContent(file.result);
      });
  }, [html, images]);

  return Content;
}
