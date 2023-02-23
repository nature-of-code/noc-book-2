// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Stay Within Walls
// "Made-up" Steering behavior to stay within walls

let v;

let debug = true;

let d = 25;

function setup() {
  createCanvas(640, 360);
  v = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(51);

  if (debug) {
    stroke(175);
    noFill();
    rectMode(CENTER);
    rect(width / 2, height / 2, width - d * 2, height - d * 2);
  }

  // Call the appropriate steering behaviors for our agents
  v.boundaries();

  v.update();
  v.display();

}

function mousePressed() {
  debug = !debug;
}