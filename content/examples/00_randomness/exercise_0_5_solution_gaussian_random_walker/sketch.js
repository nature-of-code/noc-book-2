// The Nature of Code, Exercise 0.5
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

  step() {
    let xstep = randomGaussian(0, 3);
    let ystep = randomGaussian(0, 3);
    this.x += xstep;
    this.y += ystep;
  }
}
