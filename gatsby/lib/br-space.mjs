import { visit } from 'unist-util-visit';

export default function rehypeReplaceBrWithSpace() {
  return (tree) => {
    visit(tree, { tagName: 'br' }, (node, index, parent) => {
      // Replace the <br> with a space to avoid line breaks
      parent.children.splice(index, 1, { type: 'text', value: ' ' });
    });
  };
}
