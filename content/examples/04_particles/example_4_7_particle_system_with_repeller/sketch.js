// One ParticleSystem
let emitter;

// One repeller
let repeller;

function setup() {
  createCanvas(640, 240);
  emitter = new Emitter(width / 2, 60);
  repeller = new Repeller(width / 2, 240);
}

function draw() {
  background(255);
  emitter.addParticle();
  // Applying a universal gravity
  let gravity = createVector(0, 0.1);
  emitter.applyForce(gravity);
  // Applying the repeller
  emitter.applyRepeller(repeller);
  emitter.run();

  repeller.show();
}
