// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker;

function setup() {
  createCanvas(640, 240); // creating canvas of size 640 x 240
  walker = new Walker(); // creating an instance/object of class Walker
  background(255);
}

function draw() {
  walker.walk();
  walker.display();
}

class Walker {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    // Perlin noise x and y offset
    this.noff = createVector(random(1000), random(1000));
  }

  display() {
    strokeWeight(2);
    fill(127);
    stroke(0);
    ellipse(this.position.x, this.position.y, 48, 48);
  }

  walk() {
    // Noise returns a value between 0 and 1
    this.position.x = map(noise(this.noff.x), 0, 1, 0, width);
    this.position.y = map(noise(this.noff.y), 0, 1, 0, height);
    this.noff.add(0.01, 0.01, 0);
  }
}
