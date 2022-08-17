import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import rehypeParse from 'rehype-parse';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import { toString } from 'hast-util-to-string';

export function parseContent({ html, images }) {
  const replaceMedia = () => (tree) => {
    visit(tree, { tagName: 'img' }, (node) => {
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
    visit(tree, { tagName: 'div' }, (node) => {
      if (
        node.properties.dataType === 'example' &&
        node.properties.dataExamplePath
      ) {
        node.tagName = 'embed-example';
      }
      if (node.properties.dataType === 'equation') {
        node.properties.className = ['math-display'];
      }
    });
    visit(tree, { tagName: 'span' }, (node) => {
      if (
        node.properties.className &&
        node.properties.className.includes('highlight')
      ) {
        node.tagName = 'highlight';
      }
      if (node.properties.dataType && node.properties.dataType === 'equation') {
        node.properties.className = ['math-inline'];
      }
    });
  };

  const ast = unified().use(rehypeParse, { fragment: true }).parse(html);

  const transformedAst = unified()
    .use(replaceMedia)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .runSync(ast);

  /**
   * Generate Table of Content
   */
  const toc = [];
  visit(ast, [{ tagName: 'h1' }, { tagName: 'h2' }], (node) => {
    toc.push({
      id: node.properties.id,
      title: toString(node),
      level: node.tagName,
    });
  });

  return {
    ast: transformedAst,
    toc,
  };
}
