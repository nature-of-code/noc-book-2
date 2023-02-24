// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let ps;

function setup() {
  createCanvas(640, 240);
  ps = new ParticleSystem(width / 2, 50);
}

function draw() {
  background(255);

  // Apply gravity force to all Particles
  let gravity = createVector(0, 0.1);
  ps.applyForce(gravity);

  ps.addParticle();
  ps.run();
}