// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of the basics of motion with vector.
// A "Mover" object stores position, velocity, and acceleration as vectors
// The motion is controlled by affecting the acceleration (in this case towards the mouse)

let movers = [];

function setup() {
  createCanvas(640, 240);
  for (var i = 0; i < 20; i++) {
     movers[i] = new Mover();
  }
}

function draw() {
  background(255);
  for (let i = 0; i < movers.length; i++) {
    movers[i].update();
    movers[i].display();
  }
}
