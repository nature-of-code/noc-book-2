// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Particles are generated each cycle through draw(),
// fall with gravity and fade out over time
// A ParticleSystem object manages a variable size
// list of particles.


let particleSystem;

function setup() {
  createCanvas(640, 240);
  particleSystem = new ParticleSystem(width / 2, 50);
}

function draw() {
  background(255);
  particleSystem.addParticle();
  particleSystem.run();
}