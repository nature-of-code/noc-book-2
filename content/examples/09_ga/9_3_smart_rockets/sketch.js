// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smart Rockets w/ Genetic Algorithms

// Each Rocket's DNA is an array of PVectors
// Each PVector acts as a force for each frame of animation
// Imagine an booster on the end of the rocket that can polet in any direction
// and fire at any strength every frame

// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

// This example is inspired by Jer Thorp's Smart Rockets
// http://www.blprnt.com/smartrockets/

let lifeSpan = 250; // How long should each generation live

let population; // Population

let lifeCounter = 0; // Timer for cycle of generation
let recordtime; // Fastest time to target

let target; // Target position

//let diam = 24;          // Size of target

let obstacles = []; //an array list to keep track of all the obstacles!

function setup() {
  createCanvas(640, 240);
  // Initialize variables
  recordTime = lifeSpan;

  target = new Obstacle(width / 2 - 12, 24, 24, 24);

  // Create a population with a mutation rate, and population max
  population = new Population(0.01, 150);

  // Create the obstacle course
  obstacles = [];
  obstacles.push(new Obstacle(width / 2 - 75, height / 2, 150, 10));
}

function draw() {
  background(255);
  
  // Draw the start and target positions
  target.show();

  // If the generation hasn't ended yet
  if (lifeCounter < lifeSpan) {
    population.live(obstacles);
    if (population.targetReached() && lifeCounter < recordTime) {
      recordTime = lifeCounter;
    } else {
      lifeCounter++;
    }
    // Otherwise a new generation
  } else {
    lifeCounter = 0;
    population.calculateFitness();
    population.selection();
    population.reproduction();
  }

  // Draw the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }

  // Display some info
  fill(0);
  noStroke();
  text("Generation #: " + population.generations, 10, 18);
  text("Cycles left: " + (lifeSpan - lifeCounter), 10, 36);
  text("Record cycles: " + recordTime, 10, 54);
}

// Move the target if the mouse is pressed
// System will adapt to new target
function mousePressed() {
  target.position.x = mouseX;
  target.position.y = mouseY;
  recordTime = lifeSpan;
}
