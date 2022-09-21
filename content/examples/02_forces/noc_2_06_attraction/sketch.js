// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
let mover;

let attractor;

function setup() {
  createCanvas(640, 360);
  mover = new Mover(300, 100, 2);
  attractor = new Attractor();
}

function draw() {
  background(51);

  let force = attractor.attract(mover);
  mover.applyForce(force);
  mover.update();

  attractor.display();
  mover.display();
}

function mouseMoved() {
  attractor.handleHover(mouseX, mouseY);
}

function mousePressed() {
  attractor.handlePress(mouseX, mouseY);
}

function mouseDragged() {
  attractor.handleHover(mouseX, mouseY);
  attractor.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  attractor.stopDragging();
}