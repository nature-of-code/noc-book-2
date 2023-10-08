// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// A class to describe a population of "creatures"

// Initialize the population
class Population {
  constructor(mutation, length) {
    this.mutationRate = mutation; // Mutation rate
    this.population = []; // Array to hold the current population
    this.matingPool = []; // ArrayList which we will use for our "mating pool"
    this.generations = 0; // Number of generations
    //make a new set of creatures
    for (let i = 0; i < length; i++) {
      let x = width / 2;
      let y = height + 20;
      this.population[i] = new Rocket(x, y, new DNA());
    }
  }

  live() {
    for (let rocket of this.population) {
      //{!1} The run method takes care of the simulation, updates the rocket’s
      // position, and draws it to the canvas.
      rocket.run();
    }
  }

  // Calculate the fitness for each rocket.
  fitness() {
    for (let rocket of this.population) {
      rocket.calculateFitness();
    }
  }

  // The selection method normalizes all the fitness values.
  selection() {
    // Sum all of the fitness values.
    let totalFitness = 0;
    for (let rocket of this.population) {
      totalFitness += rocket.fitness;
    }
    // Divide by the total to normalize the fitness values.
    for (let rocket of this.population) {
      rocket.fitness /= totalFitness;
    }
  }

  // Making the next generation
  reproduction() {
    // Create a new the population with children from the mating pool
    let nextPopulation = [];
    for (let i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      let parentA = this.weightedSelection();
      let parentB = this.weightedSelection();
      let child = parentA.crossover(parentB);
      // Mutate their genes
      child.mutate(this.mutationRate);
      let x = width / 2;
      let y = height + 20;
      nextPopulation[i] = new Rocket(x, y, child);
    }
    // Replace the old population
    this.population = nextPopulation;
    this.generations++;
  }

  weightedSelection() {
    // Start with the first element
    let index = 0;
    // Pick a starting point
    let start = random(1);
    // At the finish line?
    while (start > 0) {
      // Move a distance according to fitness
      start = start - this.population[index].fitness;
      // Next element
      index++;
    }
    // Undo moving to the next element since the finish has been reached
    index--;
    return this.population[index].dna;
  }
}
