// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let ps;
let repeller;

function setup() {
  createCanvas(640, 240);
  ps = new ParticleSystem(width / 2, 50);
  repeller = new Repeller(width / 2, height / 2);
}

function draw() {
  background(255);
  ps.addParticle(mouseX, mouseY);

  // Apply gravity force to all Particles
  let gravity = createVector(0, 0.02);
  ps.applyForce(gravity);
  ps.applyRepeller(repeller);

  repeller.show();
  ps.run();

}