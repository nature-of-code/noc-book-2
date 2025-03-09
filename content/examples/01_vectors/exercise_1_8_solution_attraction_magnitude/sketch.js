// The Nature of Code, Exercise 1.8
// Solution by Wendy Dherin
// http://natureofcode.com

let mover;

function setup() {
  createCanvas(640, 240);

  mover = new Mover(width, height);
}

function draw() {
  background(255);
  mover.update();
  mover.show();
}
