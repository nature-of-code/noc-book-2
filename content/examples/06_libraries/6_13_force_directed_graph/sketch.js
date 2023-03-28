// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

// Force directed graph,
// heavily based on: http://code.google.com/p/fidgen/

// Reference to physics world
let physics;

// A list of cluster objects
let cluster;

// Boolean that indicates whether we draw connections or not
let showPhysics = true;
let showParticles = true;

function setup() {
  createCanvas(640, 240);

  // Initialize the physics
  physics = new VerletPhysics2D();

  // Spawn a new random graph
  cluster = new Cluster(int(random(2, 20)), random(10, height / 2));
}

function draw() {
  // Update the physics world
  physics.update();

  background(255);

  if (frameCount % 120 == 0) {
    cluster = new Cluster(int(random(2, 20)), random(10, height / 2));
  }

  // Display all points
  if (showParticles) {
    cluster.show();
  }

  // If we want to see the physics
  if (showPhysics) {
    cluster.showConnections();
  }
}

// Key press commands
function keyPressed() {
  if (key == "c") {
    showPhysics = !showPhysics;
    if (!showPhysics) showParticles = true;
  } else if (key == "p") {
    showParticles = !showParticles;
    if (!showParticles) showPhysics = true;
  } else if (key == "n") {
    physics.clear();
    cluster = new Cluster(int(random(2, 20)), random(10, height / 2));
  }
}
