// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of Craig Reynolds' "Wandering" behavior
// See: http://www.red3d.com/cwr/

// Click mouse to turn on and off rendering of the wander circle

let wanderer;
let debug = true;

function setup() {
  createCanvas(640, 240);
  wanderer = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(255);
  wanderer.wander();
  wanderer.run();
}

function mousePressed() {
  debug = !debug;
}
