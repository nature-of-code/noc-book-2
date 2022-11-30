import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { remove } from 'unist-util-remove';
import rehypeParse from 'rehype-parse';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { toString } from 'hast-util-to-string';

import { rehypeCodesplit } from './codesplit.mjs';

export function parseContent(html) {
  const replaceMedia = () => (tree) => {
    visit(tree, { tagName: 'div' }, (node) => {
      if (node.properties.dataType === 'pdf-only') {
        remove(tree, node);
      }

      if (
        node.properties.dataType === 'embed' &&
        node.properties.dataExamplePath
      ) {
        node.tagName = 'embed-example';
      }

      if (
        node.properties.dataType === 'note' ||
        node.properties.dataType === 'exercise' ||
        node.properties.dataType === 'project'
      ) {
        node.properties.className = ['callout'];
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
        node.properties.className = ['callout', 'highlight'];
      }
      if (node.properties.dataType && node.properties.dataType === 'equation') {
        node.properties.className = ['math-inline'];
      }
    });
  };

  const externalLinkInNewTab = () => (tree) => {
    visit(tree, { tagName: 'a' }, (node) => {
      if (!node.properties.href) return;

      if (node.properties.href.indexOf('://') > 0) {
        node.properties.target = '_blank';
        node.properties.rel = 'noopener';
      }
    });
  };

  const ast = unified().use(rehypeParse, { fragment: true }).parse(html);

  const transformedAst = unified()
    .use(replaceMedia)
    .use(externalLinkInNewTab)
    .use(rehypeCodesplit)
    .use(rehypeHighlight)
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
