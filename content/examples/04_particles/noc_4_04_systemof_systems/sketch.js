// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Particles are generated each cycle through draw(),
// fall with gravity and fade out over time
// A ParticleSystem object manages a variable size
// list of particles.

// an array of ParticleSystems
let systems = [];

function setup() {
  let text = createP("click to add particle systems");
  text.position(10, 365);

  createCanvas(640, 360);
}

function draw() {
  background(51);
  for (let i = 0; i < systems.length; i++) {
    systems[i].addParticle();
    systems[i].run();
  }
}

function mousePressed() {
  systems.push(new ParticleSystem(1, createVector(mouseX, mouseY)));
}