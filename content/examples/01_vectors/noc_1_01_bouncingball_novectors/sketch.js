// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Example 1-1: Bouncing Ball, no vectors
let x = 100;
let y = 100;
let xspeed = 2.5;
let yspeed = 2;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(51);

  // Add the current speed to the position.
  x = x + xspeed;
  y = y + yspeed;

  if ((x > width) || (x < 0)) {
    xspeed = xspeed * -1;
  }
  if ((y > height) || (y < 0)) {
    yspeed = yspeed * -1;
  }

  // Display circle at x position
  stroke(0);
  strokeWeight(2);
  fill(127);
  ellipse(x, y, 48, 48);
}