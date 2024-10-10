import { visit } from 'unist-util-visit';

const isHeading = (node) => {
  return node.type === 'element' && /^h[1-6]$/i.test(node.tagName);
};

export const rehypeVideoLink = () => (tree) => {
  visit(tree, 'element', (node, index, parent) => {
    if (
      node.properties.dataType === 'video-link' &&
      node.properties.dataTitle
    ) {
      // Find the last non-text element before the current node
      let lastElement = null;
      for (let i = index - 1; i >= 0; i--) {
        const sibling = parent.children[i];

        // Skip the text nodes
        if (sibling.type === 'text') continue;

        if (sibling.type === 'element') {
          lastElement = sibling;
          break;
        }
      }

      // Check if the last element is a heading
      if (lastElement && isHeading(lastElement)) {
        node.tagName = 'video-link';

        // Move the video-link node inside the last heading
        lastElement.children.push(node);
        parent.children.splice(index, 1);
      }
    }
  });
};
