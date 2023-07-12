// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Stay Within Walls
// "Made-up" Steering behavior to stay within walls

let vehicle;

let debug = true;

let offset = 25;

function setup() {
  createCanvas(640, 240);
  vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(255);

  if (debug) {
    stroke(0);
    noFill();
    rectMode(CENTER);
    rect(width / 2, height / 2, width - d * 2, height - d * 2);
  }

  // Call the appropriate steering behaviors for our agents
  vehicle.boundaries();

  vehicle.update();
  vehicle.display();

}

function mousePressed() {
  debug = !debug;
}