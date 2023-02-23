// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Path Following
// Path is a just a straight line in this example
// Via Reynolds: // http://www.red3d.com/cwr/steer/PathFollow.html

// Using this variable to decide whether to draw all the stuff
let debug = true;

// A path object (series of connected points)
let path;

// Two vehicles
let car1;
let car2;

function setup() {
  let text = createP("Hit space bar to toggle debugging lines.<br>Click the mouse to generate a new path.");
  text.position(10, 365);

  createCanvas(640, 360);
  newPath();

  // Each vehicle has different maxspeed and maxforce for demo purposes
  car1 = new Vehicle(0, height / 2, 2, 0.04);
  car2 = new Vehicle(0, height / 2, 3, 0.1);
}

function draw() {
  background(51);
  // Display the path
  path.display();
  // The boids follow the path
  car1.follow(path);
  car2.follow(path);
  // Call the generic run method (update, borders, display, etc.)
  car1.run();
  car2.run();

  // Check if it gets to the end of the path since it's not a loop
  car1.borders(path);
  car2.borders(path);

}

function newPath() {
  // A path is a series of connected points
  // A more sophisticated path might be a curve
  path = new Path();
  path.addPoint(-20, height / 2);
  path.addPoint(random(0, width / 2), random(0, height));
  path.addPoint(random(width / 2, width), random(0, height));
  path.addPoint(width + 20, height / 2);
}

function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}

function mousePressed() {
  newPath();
}