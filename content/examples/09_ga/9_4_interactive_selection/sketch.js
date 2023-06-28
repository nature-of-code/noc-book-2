// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

let population;

function setup() {
  createCanvas(640, 240);
  colorMode(RGB, 1);
  // This is a very small population!
  let populationSize = 8;
  // A pretty high mutation rate here, our population is rather small we need to enforce variety
  let mutationRate = 0.05;
  // Create the population
  population = new Population(mutationRate, populationSize);
  // A p5.js button
  button = createButton("evolve new generation");
  button.mousePressed(nextGeneration);
  button.position(10, 210);
}

function draw() {
  background(1);
  // Draw the flowers
  population.show();
  // Check for increasing fitness
  population.rollover(mouseX, mouseY);
  textAlign(LEFT);
  text("Generation " + population.generations, 12, height - 40);
}

// If the button is pressed, evolve next generation
function nextGeneration() {
  population.selection();
  population.reproduction();
}
