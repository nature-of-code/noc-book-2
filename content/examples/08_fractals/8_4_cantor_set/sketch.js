// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Cantor Set
// Renders a simple fractal, the Cantor Set

function setup() {
  createCanvas(640, 120);
  background(255);

  // Call the recursive function
  strokeWeight(2);
  cantor(10, 10, 620);
}

function draw() {
  // No need to loop
  noLoop();
}

function cantor(x, y, length) {
  //{!1} Stop at 1 pixel!
  if (length > 1) {
    line(x, y, x + length, y);
    cantor(x, y + 20, length / 3);
    cantor(x + (2 * length) / 3, y + 20, length / 3);
  }
}
