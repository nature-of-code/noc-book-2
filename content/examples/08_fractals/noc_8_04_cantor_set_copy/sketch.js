// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Cantor Set
// Renders a simple fractal, the Cantor Set

function setup() {
  createCanvas(640, 140);
  background(255);
  stroke(0);
  strokeWeight(2);

  // Call the recursive function
  cantor(10, 20, width - 20);
}

function draw() {
  // No need to loop
  noLoop();
}

function cantor(x, y, length) {
  if (length > 1) {
    line(x, y, x + length, y);
    //{$1} Two recursive calls, note how 20 pixels are added to y
    cantor(x, y + 20, length / 3);
    cantor(x + (2 * length) / 3, y + 20, length / 3);
  }
}
