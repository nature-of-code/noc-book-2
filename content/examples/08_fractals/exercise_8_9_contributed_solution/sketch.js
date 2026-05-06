// The Nature of Code Exercise 8.9
// Solution by Rick Sidwell
// http://natureofcode.com

// The logical origin for this is the bottom center
// This will be the root of the tree

let maxLen;
let branches = [];

function setup() {
  createCanvas(640, 240);
  maxLen = height / 3;

  // First branch (trunk) of the tree
  branches.push(new Branch(createVector(0, 0), -PI / 2, maxLen));

  // First unprocessed branch
  let first = 0;

  // Apply the rules ten times.
  for (let i = 0; i < 10; i++) {
    next = branches.length;
    generate(first);
    first = next;
  }
  generateLeaves(first);
}

// Current time
let t = 0.0;

function draw() {
  background("snow");
  translate(width / 2, height); // set origin to bottom center

  for (let branch of branches) {
    branch.show(t, maxLen);
  }

  t += 0.0075;
}

function generate(first) {
  let end = branches.length;
  for (let i = first; i < end; i++) {
    let newBranches = branches[i].nextBranches();
    for (let branch of newBranches) {
      branches.push(new Branch(branch[0], branch[1], branch[2]));
    }
  }
}

function generateLeaves(first) {
  let end = branches.length;
  for (let i = first; i < end; i++) {
    let leaf = branches[i].nextBranches()[0];
    branches.push(new Branch(leaf[0], leaf[1], -2 * leaf[2]));
  }
}
