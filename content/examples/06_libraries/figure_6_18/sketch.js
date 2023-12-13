// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let {
  VerletPhysics2D,
  VerletParticle2D,
  VerletSpring2D,
  VerletMinDistanceSpring2D,
} = toxi.physics2d;

// Reference to physics world
let physics;

// A list of cluster objects
let clusters;

// Boolean that indicates whether we draw connections or not
let showPhysics = true;
let showParticles = true;

function setup() {
  createCanvas(640, 240);

  // Initialize the physics
  physics = new VerletPhysics2D();

  // Spawn a new random graph
  newGraph();
}

// Spawn a new random graph
function newGraph() {
  // Clear physics
  physics.clear();

  // Create new ArrayList (clears old one)
  clusters = [];

  // Create 8 random clusters
  for (let i = 0; i < 9; i++) {
    clusters.push(new Cluster(random(3, 8), random(20, 100)));
  }

  //	All clusters connect to all clusters
  for (let i = 0; i < clusters.length; i++) {
    for (let j = i + 1; j < clusters.length; j++) {
      clusters[i].connect(clusters[j]);
    }
  }
}

function draw() {
  // Update the physics world
  physics.update();

  background(255);

  // Display all points
  if (showParticles) {
    for (let cluster of clusters) {
      cluster.show();
    }
  }

  // If we want to see the physics
  if (showPhysics) {
    for (let i = 0; i < clusters.length; i++) {
      // Cluster internal connections
      clusters[i].showConnections();

      // Cluster connections to other clusters
      for (let j = i + 1; j < clusters.length; j++) {
        //clusters[i].showConnections(clusters[j]);
      }
    }
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
    newGraph();
  }
}
