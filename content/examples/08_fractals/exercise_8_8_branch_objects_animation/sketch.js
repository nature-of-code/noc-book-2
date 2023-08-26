// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Recursive Tree (w/ JavaScript Arrays)
// Nature of Code, Chapter 8

// Recursive branching "structure" without an explicitly recursive function
// Instead we have a JavaScript Array to hold onto N number of elements
// For every element in the Array, we add 2 more elements, etc. (this is the recursion)

// An array that will keep track of all current branches
let tree = [];
let leaves = [];

function setup() {
  createCanvas(640, 240);
  background(255);
  // Setup the array and add one branch to it
  // A branch has a starting position, a starting "velocity", and a starting "timer"

  let start = createVector(width / 2, height);
  let dir = createVector(0, -1);

  let b = new Branch(start, dir, 80);
  // Add to array
  tree.push(b);
}

function draw() {
  background(255);

  // Let's stop when the array gets too big
  // For every branch in the array
  for (let i = tree.length - 1; i >= 0; i--) {
    // Get the branch, update and draw it
    let b = tree[i];
    b.update();
    b.show();
    // If it's ready to split
    if (b.timeToBranch()) {
      if (tree.length < 1024) {
        //tree.splice(i, 1); // Delete it
        tree.push(b.branch(30)); // Add one going right
        tree.push(b.branch(-25)); // Add one going left
      } else {
        leaves.push(new Leaf(b.end));
      }
    }
  }

  for (let leaf of leaves) {
    leaf.show();
  }
}
