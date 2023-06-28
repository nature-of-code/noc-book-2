// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// Creature class

// Create a "bloop" creature
class Bloop {
  constructor(position, dna) {
    this.position = position; // Location
    this.health = 200; // Life timer
    this.xoff = random(1000); // For perlin noise
    this.yoff = random(1000);
    this.dna = dna; // DNA
    // DNA will determine size and maxspeed
    // The bigger the bloop, the slower it is
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
    this.r = map(this.dna.genes[0], 0, 1, 0, 25);
  }

  run() {
    this.update();
    this.borders();
    this.show();
  }

  // A bloop can find food and eat it
  eat(food) {
    // Check all the food vectors
    let positions = food.foodPositions;
    for (let i = positions.length - 1; i >= 0; i--) {
      // How far away is the bloop?
      let distance = p5.Vector.dist(this.position, positions[i]);
      // If the food is nearby
      if (distance < this.r * 2) {
        // Increase health and remove the food!
        this.health += 100;
        positions.splice(i, 1);
      }
    }
  }

  // At any moment there is a teeny, tiny chance a bloop will reproduce
  reproduce() {
    // Single parent reproduction
    if (random(1) < 0.0005) {
      // Child is exact copy of single parent
      let childDNA = this.dna.copy();
      // Child DNA can mutate
      childDNA.mutate(0.01);
      return new Bloop(this.position.copy(), childDNA);
    } else {
      return null;
    }
  }

  // Method to update position
  update() {
    // Simple movement based on perlin noise
    let vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed);
    let vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed);
    let velocity = createVector(vx, vy);
    this.xoff += 0.01;
    this.yoff += 0.01;

    this.position.add(velocity);
    // Death always looming
    this.health -= 0.2;
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  // Method to display
  show() {
    stroke(0, this.health);
    fill(0, this.health);
    circle(this.position.x, this.position.y, this.r * 2);
  }

  // Death
  dead() {
    return this.health < 0.0;
  }
}
