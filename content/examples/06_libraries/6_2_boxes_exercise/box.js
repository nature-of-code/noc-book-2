// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box

class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 16;
  }

  // Drawing the box
  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    square(this.x, this.y, this.w);
  }
}