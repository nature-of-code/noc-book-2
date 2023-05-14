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

// Mutation rate
let mutationRate = 0.01;
// Population Size
let populationSize = 150;

// Population array
let population = [];
// Mating pool array
let matingPool = [];
// Target phrase
let target = "to be or not to be";

function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < populationSize; i++) {
    population[i] = new DNA(target.length);
  }
}

function draw() {
  for (let i = 0; i < population.length; i++) {
    population[i].calculateFitness(target);
  }

  let matingPool = []; // ArrayList which we will use for our "mating pool"

  for (let i = 0; i < population.length; i++) {
    let nnnn = floor(population[i].fitness * 100); // Arbitrary multiplier, we can also use monte carlo method
    for (let j = 0; j < nnnn; j++) {
      // and pick two random numbers
      matingPool.push(population[i]);
    }
  }

  for (let i = 0; i < population.length; i++) {
    let a = floor(random(matingPool.length));
    let b = floor(random(matingPool.length));
    let partnerA = matingPool[a];
    let partnerB = matingPool[b];
    let child = partnerA.crossover(partnerB);
    child.mutate(mutationRate);
    population[i] = child;
  }

  let everything = "";
  for (let i = 0; i < population.length; i++) {
    everything += population[i].getPhrase() + "    ";
  }
  background(255);
  textFont("Courier");
  textSize(12);
  text(everything, 0, 0, width, height);
}
