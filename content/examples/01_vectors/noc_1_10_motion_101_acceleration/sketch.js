// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of the basics of motion with vector.
// A "Mover" object stores position, velocity, and acceleration as vectors
// The motion is controlled by affecting the acceleration (in this case towards the mouse)

let mover;

function setup() {
  createCanvas(640, 360);
  mover = new Mover();
}

function draw() {
  background(51);

  mover.update();
  mover.display();
}