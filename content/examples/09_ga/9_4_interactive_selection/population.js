// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// A class to describe a population of faces
// this hasn't changed very much from example to example

// Create the population
class Population {
  constructor(mutationRate, size) {
    this.mutationRate = mutationRate; // Mutation rate
    this.population = []; // array to hold the current population
    this.matingPool = [];
    this.generations = 0; // Number of generations
    for (let i = 0; i < size; i++) {
      this.population[i] = new Flower(new DNA(), 40 + i * 80, 60);
    }
  }

  // Display all faces
  show() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].show();
    }
  }

  // Are we rolling over any of the faces?
  rollover(mx, my) {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].rollover(mx, my);
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

  weightedSelection() {
    // Start with the first element
    let index = 0;
    // Pick a starting point
    let start = random(1);
    // At the finish line?
    while (start > 0) {
      // Move a distance according to fitness
      start = start - population[index].fitness;
      // Next element
      index++;
    }
    // Undo moving to the next element since the finish has been reached
    index--;
    return this.population[index];
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
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      let m = floor(random(this.matingPool.length));
      let d = floor(random(this.matingPool.length));
      // Pick two parents
      let mom = this.matingPool[m];
      let dad = this.matingPool[d];
      // Get their genes
      let momgenes = mom.getDNA();
      let dadgenes = dad.getDNA();
      // Mate their genes
      let child = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new population with the new child
      this.population[i] = new Flower(child, 40 + i * 80, 60);
    }
    this.generations++;
  }
}
