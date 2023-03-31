// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Stochastic Tree
// Renders a simple tree-like structure via recursion
// Angles and number of branches are random

function setup() {
  createCanvas(640, 240);
  frameRate(1);
}

function draw() {
  background(255);

  stroke(0);
  push();
  // Start the tree from the bottom of the screen
  translate(width / 2, height);
  strokeWeight(2);
  // Start the recursive branching!
  branch(80);
  pop();
}

function branch(length) {
  // Draw the actual branch
  line(0, 0, 0, -length);
  // Move along to end
  translate(0, -length);

  // Each branch will be 2/3rds the size of the previous one
  length *= 0.67;

  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (length > 2) {
    // A random number of branches
    let n = Math.floor(random(1, 4));
    for (let i = 0; i < n; i++) {
      // Picking a random angle
      let angle = random(-PI / 2, PI / 2);
      push(); // Save the current state of transformation (i.e. where are we now)
      rotate(angle); // Rotate by theta
      branch(length); // Ok, now call myself to branch again
      pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state
    }
  }
}
