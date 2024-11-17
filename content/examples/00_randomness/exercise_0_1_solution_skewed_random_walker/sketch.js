// The Nature of Code, Exercise 0.1
// Solution by Rick Sidwell
// http://natureofcode.com

let walker;

function setup() {
  createCanvas(640, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }

  // Give the walker a greater tendency to move down and left by making
  // the random range larger in that direction
  step() {
    let xstep = random(-2.75, 3);
    let ystep = random(-2.75, 3);
    this.x += xstep;
    this.y += ystep;
  }
}
