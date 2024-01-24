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
      if (
        node.properties.className &&
        Array.isArray(node.properties.className) &&
        (node.properties.className.includes('pdf-only') ||
          node.properties.className.includes('chapter-opening-figure'))
      ) {
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

  /**
   * List all examples
   */
  const examples = [];
  visit(ast, { tagName: 'div' }, (node) => {
    if (node.properties.dataType !== 'example') {
      return;
    }

    // Locate the h3 element within the current node's children
    const titleNode = node.children.find((child) => child.tagName === 'h3');
    const slug = titleNode && titleNode.properties.id;
    const title =
      titleNode && titleNode.children.length > 0
        ? titleNode.children[0].value
        : '';

    visit(node, { tagName: 'div' }, (embedDivNode) => {
      if (embedDivNode.properties.dataType !== 'embed') return;
      examples.push({
        title,
        slug,
        relativeDirectory: embedDivNode.properties.dataExamplePath,
        webEditorURL: embedDivNode.properties.dataP5Editor,
      });
    });
  });

  const transformedAst = unified()
    .use(replaceMedia)
    .use(externalLinkInNewTab)
    .use(rehypeCodesplit)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .runSync(ast);

  return {
    ast: transformedAst,
    toc,
    examples,
  };
}
