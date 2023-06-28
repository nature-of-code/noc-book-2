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
    this.w = 70; // Size of square enclosing flower
    this.h = 140; // Size of square enclosing flower
    this.fitness = 1; // How good is this flower?
    this.boundingBox = new Rectangle(
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  }

  // Display the flower
  show() {
    let genes = this.dna.genes;
    let c = color(genes[0], genes[1], genes[2], genes[3]); // petal color
    let size = map(genes[4], 0, 1, 4, 24); // petal size
    let count = floor(map(genes[5], 0, 1, 2, 16)); // petal count
    let centerColor = color(genes[6], genes[7], genes[8]); // center color
    let centerSize = map(genes[9], 0, 1, 24, 48); // center size
    let stemColor = color(genes[10], genes[11], genes[12]); // stem color
    let stemLength = map(genes[13], 0, 1, 50, 100); // stem length

    push();
    translate(this.x, this.y);
    // Draw the bounding box
    if (this.rolloverOn) fill(0, 0.25);
    else noFill();
    stroke(0);
    strokeWeight(0.5);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);

    translate(0, this.h / 2 - stemLength);

    // Draw the stem
    stroke(stemColor);
    strokeWeight(4);
    line(0, 0, 0, stemLength);

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

    pop();

    // Display fitness value
    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    text("" + floor(this.fitness), this.x, this.y + 90);
  }

  // Increment fitness if mouse is rolling over flower
  rollover(mx, my) {
    if (this.boundingBox.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}
