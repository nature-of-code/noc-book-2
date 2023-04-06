// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// The World we live in
// Has bloops and food

// Constructor
class World {
  constructor(num) {
    // Start with initial food and creatures
    this.food = new Food(num);
    this.bloops = []; // An array for all creatures
    for (let i = 0; i < num; i++) {
      let l = createVector(random(width), random(height));
      let dna = new DNA();
      this.bloops.push(new Bloop(l, dna));
    }
  }

  // Make a new creature
  born(x, y) {
    let l = createVector(x, y);
    let dna = new DNA();
    this.bloops.push(new Bloop(l, dna));
  }

  // Run the world
  run() {
    // Deal with food
    this.food.run();

    // Cycle through the ArrayList backwards b/c we are deleting
    for (let i = this.bloops.length - 1; i >= 0; i--) {
      // All bloops run and eat
      let b = this.bloops[i];
      b.run();
      b.eat(this.food);
      // If it's dead, kill it and make food
      if (b.dead()) {
        this.bloops.splice(i, 1);
        this.food.add(b.position);
      }
      // Perhaps this bloop would like to make a baby?
      let child = b.reproduce();
      if (child != null) this.bloops.push(child);
    }
  }
}