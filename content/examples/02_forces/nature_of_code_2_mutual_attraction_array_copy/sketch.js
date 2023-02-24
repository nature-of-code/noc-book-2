// Mutual Attract// The Nature of Code

let bodyA;
let bodyB;

let G = 1;

function setup() {
  createCanvas(640, 240);
  bodyA = new Body(320, 40);
  bodyB = new Body(320, 200);
  bodyA.velocity = createVector(1, 0);
  bodyB.velocity = createVector(-1, 0);
}

function draw() {
  background(255);

  bodyA.attract(bodyB);
  bodyB.attract(bodyA);

  bodyA.update();
  bodyA.show();
  bodyB.update();
  bodyB.show();
}
