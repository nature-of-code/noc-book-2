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
    this.flowers = []; // array to hold the current population
    this.matingPool = [];
    this.generations = 0; // Number of generations
    for (let i = 0; i < size; i++) {
      this.flowers[i] = new Flower(new DNA(), 40 + i * 80, 120);
    }
  }

  // Display all faces
  show() {
    for (let i = 0; i < this.flowers.length; i++) {
      this.flowers[i].show();
    }
  }

  // Are we rolling over any of the faces?
  rollover(mx, my) {
    for (let i = 0; i < this.flowers.length; i++) {
      this.flowers[i].rollover(mx, my);
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
      start = start - this.flowers[index].fitness;
      // Next element
      index++;
    }
    // Undo moving to the next element since the finish has been reached
    index--;
    return this.flowers[index];
  }

  selection() {
    // Sum all of the fitness values
    let totalFitness = 0;
    for (let i = 0; i < this.flowers.length; i++) {
      totalFitness += this.flowers[i].fitness;
    }
    // Divide by the total to normalize the fitness values
    for (let i = 0; i < this.flowers.length; i++) {
      this.flowers[i].fitness /= totalFitness;
    }
  }

  // Making the next generation
  reproduction() {
    let nextFlowers = [];
    // Create the next population with children from the mating pool
    for (let i = 0; i < this.flowers.length; i++) {
      // Sping the wheel of fortune to pick two parents
      let parentA = this.weightedSelection();
      let parentB = this.weightedSelection();
      let child = parentA.dna.crossover(parentB.dna);
      // Mutate their genes
      child.mutate(this.mutationRate);
      nextFlowers[i] = new Flower(child, 40 + i * 80, 80);
    }
    // Replace the old population
    this.flowers = nextFlowers;
    this.generations++;
  }
}
