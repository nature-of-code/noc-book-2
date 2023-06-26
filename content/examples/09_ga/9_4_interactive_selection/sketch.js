// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

let population;

function setup() {
  createCanvas(640, 240);
  colorMode(RGB, 1.0, 1.0, 1.0, 1.0);
  let populationSize = 8;
  let mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, populationSize);
  // A simple button class
  button = createButton("evolve new generation");
  button.mousePressed(nextGeneration);
  button.position(10, 200);
}

function draw() {
  background(1);
  // Display the faces
  population.show();
  population.rollover(mouseX, mouseY);
  textFont("Courier");
  textAlign(LEFT);
  text("Generation " + population.generations, 12, height - 48);
}

// If the button is clicked, evolve next generation
function nextGeneration() {
  population.selection();
  population.reproduction();
}
