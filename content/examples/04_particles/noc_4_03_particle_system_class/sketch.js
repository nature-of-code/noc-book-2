// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let ps;

function setup() {
  createCanvas(640, 360);
  ps = new ParticleSystem(createVector(width / 2, 50));
}

function draw() {
  background(51);
  ps.addParticle();
  ps.run();
}