// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Array of Images for particle textures

let ps;

let imgs = [];

function preload() {
  imgs[0] = loadImage("data/emitter.png");
  imgs[1] = loadImage("data/particle.png");
  imgs[2] = loadImage("data/reflection.png");
}

function setup() {
  createCanvas(640, 240);
  ps = new ParticleSystem(imgs);
}

function draw() {
  // Try additive blending!
  blendMode(ADD);
  clear();

  background(0);

  // Additive blending!
  ps.addParticle(mouseX, mouseY);

  let up = createVector(0, -0.2);
  ps.applyForce(up);

  ps.update();
}
