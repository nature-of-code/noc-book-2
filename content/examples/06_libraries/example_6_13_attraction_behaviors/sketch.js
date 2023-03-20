// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D } = toxi.physics2d;
let { AttractionBehavior } = toxi.physics2d.behaviors;

// Reference to physics world
let physics;

let particles = [];
let attractor;

function setup() {
  createCanvas(640, 240);

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));

  physics.setDrag(0.01);

  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(random(width), random(height), 4));
  }
  attractor = new Attractor(width / 2, height / 2, 16);
}

function draw() {
  background(255);
  // Update the physics world
  physics.update();

  attractor.show();
  for (let particle of particles) {
    particle.show();
  }

  if (mouseIsPressed) {
    attractor.lock();
    attractor.set(mouseX, mouseY);
  } else {
    attractor.unlock();
  }
}
