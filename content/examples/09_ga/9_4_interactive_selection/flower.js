// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// The class for a "face", contains DNA sequence, fitness value, position on screen

// Fitness Function f(t) = t (where t is "time" mouse rolls over face)
// Create a new flower
class Flower {
  constructor(dna, x, y) {
    this.rolloverOn = false; // Are we rolling over this flower?
    this.dna = dna; // Flower's DNA
    this.x = x; // Position on screen
    this.y = y;
    let w = 70; // Size of square enclosing flower
    let h = 140; // Size of square enclosing flower
    this.fitness = 1; // How good is this flower?
    this.boundingBox = new Rectangle(
      this.x - w / 2,
      this.y - h / 2,
      this.w,
      this.h
    );
  }

  // Display the flower
  show() {
    let genes = this.dna.genes;
    let c = color(genes[0], genes[1], genes[2]); // petal color
    let size = map(genes[3], 0, 1, 0, this.wh / 4); // petal size
    let count = floor(map(genes[4], 0, 1, 0, 10)); // petal count
    let centerColor = color(genes[5], genes[6], genes[7]); // center color
    let centerSize = map(genes[8], 0, 1, 0, this.wh / 8); // center size
    let stemColor = color(genes[9], genes[10], genes[11]); // stem color
    let stemLength = map(genes[12], 0, 1, 0, (this.wh * 3) / 4); // stem length

    push();
    translate(this.x, this.y);
    noStroke();

    // Draw the petals
    fill(c);
    for (let i = 0; i < count; i++) {
      let angle = map(i, 0, count, 0, TWO_PI);
      let x = size * cos(angle);
      let y = size * sin(angle);
      ellipse(x, y, size, size);
    }

    // Draw the center
    fill(centerColor);
    ellipse(0, 0, centerSize, centerSize);

    // Draw the stem
    fill(stemColor);
    rect(0, centerSize / 2 + stemLength / 2, 5, stemLength);

    // Draw the bounding box
    stroke(0.25);
    if (this.rolloverOn) fill(0, 0.25);
    else noFill();
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);
    pop();

    // Display fitness value
    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    text("" + floor(this.fitness), this.x, this.y + 55);
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over flower
  rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}
