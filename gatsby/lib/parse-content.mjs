import { unified } from 'unified';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import { remove } from 'unist-util-remove';
import rehypeParse from 'rehype-parse';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { toString } from 'hast-util-to-string';

import { rehypeCodesplit } from './codesplit.mjs';
import { preserveCustomSpans, restoreCustomSpans } from './blank-span.mjs';
import { rehypeVideoLink } from './video-link.mjs';

export function parseContent(html) {
  const replaceMedia = () => (tree) => {
    visit(tree, { tagName: 'div' }, (node, index, parent) => {
      if (
        node.properties.className &&
        Array.isArray(node.properties.className) &&
        node.properties.className.includes('pdf-only')
      ) {
        remove(tree, node);
      }

      if (
        node.properties.className &&
        Array.isArray(node.properties.className) &&
        node.properties.className.includes('chapter-opening-figure')
      ) {
        // Find the h3 element within the children of the node
        node.children.forEach((child, index) => {
          if (child.tagName === 'h3') {
            // Replace the h3 tag with a span tag
            node.children[index] = h('span', child.properties, child.children);
          }
        });
        node.children.push(h('hr'));
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

    /**
     * using colon as separator instead of period
     *
     * e.g.
     * 'Chapter 4. Particle Systems' => 'Chapter 4: Particle Systems'
     */
    visit(tree, { tagName: 'h1' }, (node) => {
      const originalTitle = node.children[0].value;
      const modifiedTitle = originalTitle.replace(/(Chapter \d+)\./, '$1:');

      node.children[0].value = modifiedTitle;
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

  /**
   * List all exercises
   */
  const exercises = [];
  visit(ast, { tagName: 'div' }, (node) => {
    if (node.properties.dataType !== 'exercise') {
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
      exercises.push({
        title,
        slug,
        relativeDirectory: embedDivNode.properties.dataExamplePath,
        webEditorURL: embedDivNode.properties.dataP5Editor,
      });
    });
  });

  /**
   * Generate a short description
   */
  const paragraphs = [];
  visit(ast, [{ tagName: 'p' }], (node, _, parent) => {
    if (
      parent.properties.dataType === 'chapter' ||
      parent.properties.dataType === 'page'
    ) {
      paragraphs.push(toString(node).replace(/\s+/g, ' ').trim());
    }
  });
  const description = paragraphs.join(' ').trim().substring(0, 150);

  const transformedAst = unified()
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      test: ['h2', 'h3'],
      properties: {
        class: 'heading-link',
      },
    })
    .use(replaceMedia)
    .use(rehypeVideoLink)
    .use(externalLinkInNewTab)
    .use(rehypeCodesplit)
    .use(preserveCustomSpans)
    .use(rehypeHighlight)
    .use(restoreCustomSpans)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .runSync(ast);

  return {
    ast: transformedAst,
    toc,
    description,
    examples,
    exercises,
  };
}
