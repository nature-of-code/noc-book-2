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

// Target phrase
let target = "to be or not to be";

function setup() {
  createCanvas(640, 240);
  //{!3} Step 1: Initialize Population
  for (let i = 0; i < populationSize; i++) {
    population[i] = new DNA(target.length);
  }
}

function draw() {
  // Step 2: Selection
  //{!3} Step 2a: Calculate fitness.
  for (let phrase of population) {
    phrase.calculateFitness(target);
  }

  // Step 2b: Build mating pool.
  let matingPool = [];

  for (let phrase of population) {
    //{!4} Add each member n times according to its fitness score.
    let n = floor(phrase.fitness * 100);
    for (let j = 0; j < n; j++) {
      matingPool.push(phrase);
    }
  }

  // Step 3: Reproduction
  for (let i = 0; i < population.length; i++) {
    let aIndex = floor(random(matingPool.length));
    let bIndex = floor(random(matingPool.length));
    let partnerA = matingPool[aIndex];
    let partnerB = matingPool[bIndex];
    // Step 3a: Crossover
    let child = partnerA.crossover(partnerB);
    // Step 3b: Mutation
    child.mutate(mutationRate);

    //{!1} Note that we are overwriting the population with the new
    // children.  When draw() loops, we will perform all the same
    // steps with the new population of children.
    population[i] = child;
  }

  let everything = "";
  for (let i = 0; i < population.length; i++) {
    everything += population[i].getPhrase() + "    ";
  }
  background(255);
  textFont("Courier");
  textSize(12);
  text(everything, 12, 0, width, height);
}
