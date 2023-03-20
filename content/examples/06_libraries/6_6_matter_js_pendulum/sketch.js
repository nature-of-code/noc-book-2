// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

const { Engine, Bodies, Composite, Constraint } = Matter;

// A reference to the matter physics engine
let engine;

// An array for all boxes
let pendulum;

function setup() {
  createCanvas(640, 240);
  // Create the Matter engine
  engine = Engine.create();
  pendulum = new Pendulum(width / 2, 10, 100);
}

function draw() {
  background(255);

  // Update the engine!
  Engine.update(engine);

  pendulum.show();
}
