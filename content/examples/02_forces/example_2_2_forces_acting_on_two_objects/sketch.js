// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let moverA;
let moverB;

function setup() {
  createCanvas(640, 240);
  // A large Mover on the left side of the window
  moverA = new Mover(200, 30, 10);
  // A smaller Mover on the right side of the window
  moverB = new Mover(440, 30, 2);
  createP('Click mouse to apply wind force.');
}

function draw() {
  background(255);

  let gravity = createVector(0, 0.1);
  moverA.applyForce(gravity);
  moverB.applyForce(gravity);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind);
  }

  moverA.update();
  moverA.show();
  moverA.checkEdges();

  moverB.update();
  moverB.show();
  moverB.checkEdges();
}