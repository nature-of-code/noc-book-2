// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function setup() {
  createCanvas(640, 240);
  background(255);
}

function draw() {
  fill(0, 25);
  stroke(0, 50);
  circle(random(width), random(height), 16);
}
