// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

const { Engine, Bodies, Body, Composite, Vector } = Matter;

// A Mover and an Attractor
let movers = [];
let attractor;

let engine;

// Gravitational constant (for global scaling)

function setup() {
  createCanvas(640, 240);

  // Create the Matter engine
  engine = Engine.create();
  engine.gravity = Vector.create(0, 0);

  for (let i = 0; i < 100; i++) {
    movers[i] = new Mover(random(width), random(height), random(4, 8));
  }
  attractor = new Attractor(width / 2, height / 2);
}

function draw() {
  background(255);
  Engine.update(engine);
  for (let mover of movers) {
    let force = attractor.attract(mover);
    mover.applyForce(force);
    mover.show();
  }

  attractor.show();
}
