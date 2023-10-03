// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Example 1-1: Bouncing Ball, no vectors
// Variables for position and speed of ball.
let x = 100;
let y = 100;
let xspeed = 2.5;
let yspeed = 2;

function setup() {
  createCanvas(640, 240);
  background(255);
}

function draw() {
  background(255);

  // Move the ball according to its speed.
  x = x + xspeed;
  y = y + yspeed;

  //{!6} Check for bouncing.
  if (x > width || x < 0) {
    xspeed = xspeed * -1;
  }
  if (y > height || y < 0) {
    yspeed = yspeed * -1;
  }

  stroke(0);
  fill(127);
  strokeWeight(2);
  //{!1} Draw the ball at the position (x,y).
  circle(x, y, 48);
}
