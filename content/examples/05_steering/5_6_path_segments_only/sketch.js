// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Path Following
// Path is a just a straight line in this example
// Via Reynolds: // http://www.red3d.com/cwr/steer/PathFollow.html

// A path object (series of connected points)
let path;

function setup() {
  createCanvas(640, 240);
  path = new Path();
  path.addPoint(-20, height / 2);
  path.addPoint(100, 50);
  path.addPoint(400, 200);
  path.addPoint(width + 20, height / 2);
}

function draw() {
  background(255);
  // Display the path
  path.show();
}

function keyPressed() {
  if (key == " ") {
    debug = !debug;
  }
}
