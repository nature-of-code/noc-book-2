// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// A class to describe a population of "creatures"

// Initialize the population
class Population {
  constructor(mutation, length) {
    this.mutationRate = mutation; // Mutation rate
    this.population = new Array(length); // Array to hold the current population
    this.generations = 0; // Number of generations
    // Make a new set of creatures
    for (let i = 0; i < this.population.length; i++) {
      this.population[i] = new Rocket(320, 220);
    }
  }

  live(obstacles) {
    // For every creature
    for (let i = 0; i < this.population.length; i++) {
      // If it finishes, mark it down as done!
      this.population[i].checkTarget();
      this.population[i].run(obstacles);
    }
  }

  // Did anything finish?
  targetReached() {
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].hitTarget) return true;
    }
    return false;
  }

  // Calculate fitness for each creature
  calculateFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calculateFitness();
    }
  }

  selection() {
    // Sum all of the fitness values
    let totalFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      totalFitness += this.population[i].fitness;
    }
    // Divide by the total to normalize the fitness values
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].fitness /= totalFitness;
    }
  }

  // Making the next generation
  reproduction() {
    let nextPopulation = [];
    // Create the next population
    for (let i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      let parentA = this.weightedSelection();
      let parentB = this.weightedSelection();
      let child = parentA.crossover(parentB);
      // Mutate their genes
      child.mutate(this.mutationRate);
      nextPopulation[i] = new Rocket(320, 220, child);
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
    return this.population[index].brain;
  }
}
