// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let mover;

function setup() {
  createCanvas(640, 360);
  mover = new Mover(width / 2, 30, 5);
  createP('Click mouse to apply wind force.');
}

function draw() {
  background(51);

  let gravity = createVector(0, 1);
  //{!1} I should scale by mass to be more accurate, but this example only has one circle
  mover.applyForce(gravity);

  if (mouseIsPressed) {
    let wind = createVector(0.5, 0);
    mover.applyForce(wind);
  }

  if (mover.contactEdge()) {
    //{!5 .bold}
    let c = 0.1;
    let friction = mover.velocity.copy();
    friction.mult(-1);
    friction.setMag(c);

    //{!1 .bold} Apply the friction force vector to the object.
    mover.applyForce(friction);
  }

  mover.bounceEdges();
  mover.update();
  mover.display();
}