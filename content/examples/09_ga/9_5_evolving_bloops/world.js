// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// The World we live in
// Has bloops and food

class World {
  //{!2} The World class manages the
  // population of bloops and all the food
  constructor(populationSize) {
    // Create the population
    this.bloops = [];
    for (let i = 0; i < populationSize; i++) {
      let position = createVector(random(width), random(height));
      let dna = new DNA();
      this.bloops.push(new Bloop(position, dna));
    }
    // Create the food
    this.food = new Food(populationSize);
  }

  // Run the world
  run() {
    // This function draws the food and adds new food when necessary
    this.food.run();

    // Manage the bloops (cycle through array backwards since bloops are deleted.)
    for (let i = this.bloops.length - 1; i >= 0; i--) {
      // All bloops run and eat
      let bloop = this.bloops[i];
      bloop.run();
      bloop.eat(this.food);
      // If it's dead, remove it and create food
      if (bloop.dead()) {
        this.bloops.splice(i, 1);
        this.food.add(bloop.position);
      } else {
        //{!2} Here is where each living bloop has a chance to reproduce.
        // If it does, it is added to the population.
        // Note the value of "child" is undefined if it does not.
        let child = bloop.reproduce();
        if (child) {
          this.bloops.push(child);
        }
      }
    }
  }

  born(x, y) {
    let position = createVector(mouseX, mouseY);
    let dna = new DNA();
    this.bloops.push(new Bloop(position, dna));
  }
}
