// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// The class for our "face", contains DNA sequence, fitness value, position on screen

// Fitness Function f(t) = t (where t is "time" mouse rolls over face)

// Create a new face
class Face {
  constructor(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_; // Position on screen
    this.y = y_;
    this.wh = 70; // Size of square enclosing face
    this.fitness = 1; // How good is this face?
    // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);
  }

  // Display the face
  display() {
    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
    let r = map(genes[0], 0, 1, 0, 70);
    let c = color(genes[1], genes[2], genes[3]);
    let eye_y = map(genes[4], 0, 1, 0, 5);
    let eye_x = map(genes[5], 0, 1, 0, 10);
    let eye_size = map(genes[5], 0, 1, 0, 10);
    let eyecolor = color(genes[4], genes[5], genes[6]);
    let mouthColor = color(genes[7], genes[8], genes[9]);
    let mouth_y = map(genes[5], 0, 1, 0, 25);
    let mouth_x = map(genes[5], 0, 1, -25, 25);
    let mouthw = map(genes[5], 0, 1, 0, 50);
    let mouthh = map(genes[5], 0, 1, 0, 10);

    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
    push();
    translate(this.x, this.y);
    noStroke();

    // Draw the head
    fill(c);
    ellipseMode(CENTER);
    ellipse(0, 0, r, r);

    // Draw the eyes
    fill(eyecolor);
    rectMode(CENTER);
    rect(-eye_x, -eye_y, eye_size, eye_size);
    rect(eye_x, -eye_y, eye_size, eye_size);

    // Draw the mouth
    fill(mouthColor);
    rectMode(CENTER);
    rect(mouth_x, mouth_y, mouthw, mouthh);

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
    text('' + floor(this.fitness), this.x, this.y + 55);
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over face
  rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}