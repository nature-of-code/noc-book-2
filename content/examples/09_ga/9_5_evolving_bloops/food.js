// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// A collection of food in the world

class Food {
  constructor(num) {
    // Start with some food
    this.foodPositions = [];
    for (let i = 0; i < num; i++) {
      this.foodPositions.push(createVector(random(width), random(height)));
    }
  }

  // Add some food at a location
  add(position) {
    this.foodPositions.push(position.copy());
  }

  // Display the food
  run() {
    for (let i = 0; i < this.foodPositions.length; i++) {
      let position = this.foodPositions[i];
      rectMode(CENTER);
      stroke(0);
      strokeWeight(1);
      fill(200);
      square(position.x, position.y, 8);
    }

    // There's a small chance food will appear randomly
    if (random(1) < 0.001) {
      this.foodPositions.push(createVector(random(width), random(height)));
    }
  }
}
