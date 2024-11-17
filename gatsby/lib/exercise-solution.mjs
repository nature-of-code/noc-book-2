import { visit } from 'unist-util-visit';

export default function rehypeExerciseSolution() {
  return (tree) => {
    visit(tree, { tagName: 'div' }, (node) => {
      if (node.properties.dataType !== 'exercise') {
        return;
      }

      let hasSolution = false;
      let p5EditorUrl = null;

      visit(node, { tagName: 'div' }, (solutionNode, _index, _parent) => {
        // Look for solution node with a class of 'solution'
        if (
          solutionNode.properties?.className &&
          solutionNode.properties.className.includes('solution')
        ) {
          hasSolution = true;

          visit(solutionNode, { tagName: 'embed-example' }, (embedNode) => {
            if (embedNode.properties?.dataP5Editor) {
              p5EditorUrl = embedNode.properties.dataP5Editor;
              // add a class to the solution node to indicate that it is a p5 solution
              solutionNode.properties.className.push('p5-solution');

              return false;
            }
          });
        }
      });

      // If we found a solution, render it differently
      if (hasSolution) {
        node.tagName = 'exercise-with-solution';

        // If we found a p5 editor URL, add it to the node's properties
        if (p5EditorUrl) {
          node.properties.p5EditorUrl = p5EditorUrl;
        }
      }
    });
  };
}
