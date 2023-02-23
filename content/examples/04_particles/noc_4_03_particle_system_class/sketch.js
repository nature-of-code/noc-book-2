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
  ps.addParticle();
  ps.run();
}