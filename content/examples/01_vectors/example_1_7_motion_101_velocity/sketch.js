// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let mover;

function setup() {
  createCanvas(640, 240);
  mover = new Mover(); 
}

function draw() {
  background(255);

  mover.update();
  mover.checkEdges();
  mover.display();
}
