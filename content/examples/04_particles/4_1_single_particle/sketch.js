// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let particle;

function setup() {
  createCanvas(640,240);
  particle = new Particle(width / 2, 10);
}

function draw() {
  background(255);
  // Operating the single Particle
  particle.update();
  particle.show();

  // Applying a gravity force
  let gravity = createVector(0, 0.1);
  particle.applyForce(gravity);

  // Checking the particle's state and making a new particle
  if (particle.isDead()) {
    particle = new Particle(width / 2, 20);
    console.log("Particle dead!");
  }
}

