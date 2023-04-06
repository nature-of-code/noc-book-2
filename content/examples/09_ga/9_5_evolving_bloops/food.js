// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// A collection of food in the world

class Food {
  constructor(num) {
    // Start with some food
    this.food = [];
    for (let i = 0; i < num; i++) {
      this.food.push(createVector(random(width), random(height)));
    }
  }

  // Add some food at a location
  add(l) {
    this.food.push(l.copy());
  }

  // Display the food
  run() {
    for (let i = 0; i < this.food.length; i++) {
      let f = this.food[i];
      rectMode(CENTER);
      stroke(0);
      strokeWeight(1);
      fill(200);
      square(f.x, f.y, 8);
    }

    // There's a small chance food will appear randomly
    if (random(1) < 0.001) {
      this.food.push(createVector(random(width), random(height)));
    }
  }

  // Return the list of food
  getFood() {
    return this.food;
  }
}