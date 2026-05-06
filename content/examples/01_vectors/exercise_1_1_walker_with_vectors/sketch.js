// The Nature of Code, Exercise 1.1
// Solution by Brandt Ryan
// http://natureofcode.com

function setup() {
  createCanvas(640, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.update();
  walker.show();
}

class Walker {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }

  update() {
    // p5.Vector.random2D() creates a NEW unit vector (length 1)
    // pointing in a random direction.
    let stepVector = p5.Vector.random2D();

    // Scale the step vector to put some giddyup in that step!
    // Larger number = bigger step.
    stepVector.mult(2);

    // Add the random step vector to the walker's pos.
    this.pos.add(stepVector);

    // Keep this walker inside the park!
    this.pos.x = constrain(this.pos.x, 0, width - 1);
    this.pos.y = constrain(this.pos.y, 0, height - 1);
  }
}
