// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Recursion

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);
  drawCircle(width / 2, height / 2, 320);
  noLoop();
}

function drawCircle(x, y, radius) {
  stroke(0);
  strokeWeight(2);
  noFill();
  circle(x, y, radius * 2);
  if (radius > 4) {
    //{!2} drawCircle() calls itself twice. For every circle, a smaller circle is drawn to the left and the right.
    drawCircle(x + radius / 2, y, radius / 2);
    drawCircle(x - radius / 2, y, radius / 2);
  }
}
