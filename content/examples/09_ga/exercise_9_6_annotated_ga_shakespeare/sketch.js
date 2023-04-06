// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat


let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
  createCanvas(640, 240);
  //createCanvas(640, 360);
  target = "To be or not to be.";
  popmax = 200;
  mutationRate = 0.01;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
}

function draw() {
  // Generate mating pool
  population.naturalSelection();
  //Create next generation
  population.generate();
  // Calculate fitness
  population.calcFitness();

  population.evaluate();

  // If we found the target phrase, stop
  if (population.isFinished()) {
    //println(millis()/1000.0);
    noLoop();
  }
  background(255);
  let answer = population.getBest();
  fill(0);
  textFont("Courier");
  textSize(12);
  text("Best phrase:", 10, 32);
  textSize(24);
  text(answer, 10, 64);
  let statstext = "total generations:     " + population.getGenerations() + "\n";
  statstext += "average fitness:       " + nf(population.getAverageFitness(), 0, 2) + "\n";
  statstext += "total population:      " + popmax + "\n";
  statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";
  
  textSize(12);
  text(statstext, 10, 96);
  textSize(8);
  text(population.allPhrases(), width/2, 24)  
}