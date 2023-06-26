// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smart Rockets w/ Genetic Algorithms

// Each Rocket's DNA is an array of p5.Vectors
// Each p5.Vector acts as a force for each frame of animation
// Imagine a booster on the end of the rocket that can point in any direction
// and fire at any strength every frame

// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

// This example is inspired by Jer Thorp's Smart Rockets
// http://www.blprnt.com/smartrockets/

let lifeSpan = 250; // How long should each generation live
let lifeCounter = 0; // Timer for cycle of generation

let population; // Population

let target; // Target position

function setup() {
  createCanvas(640, 240);

  target = createVector(width / 2, 24);

  // Create a population with a mutation rate, and population max
  let mutationRate = 0.01;
  population = new Population(mutationRate, 50);
}

function draw() {
  background(255);

  // Draw the start and target positions
  fill(127);
  stroke(0);
  strokeWeight(2);
  circle(target.x, target.y, 24);

  // If the generation hasn't ended yet
  if (lifeCounter < lifeSpan) {
    population.live();
    lifeCounter++;
    // Otherwise a new generation
  } else {
    lifeCounter = 0;
    population.fitness();
    population.selection();
    population.reproduction();
  }

  // Display some info
  fill(0);
  noStroke();
  text(
    "Generation #: " +
      population.generations +
      "\nCycles left: " +
      (lifeSpan - lifeCounter),
    10,
    20
  );
}

// Move the target if the mouse is pressed
// System will adapt to new target
function mousePressed() {
  target.x = mouseX;
  target.y = mouseY;
}
