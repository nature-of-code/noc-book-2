// The Nature of
// Daniel Shiffman
// http://natureofcode.com

class Cell {
  constructor(state, x, y, w) {
    // What is the cell’s state?
    this.state = state;
    this.previous = this.state;

    // position and size
    this.x = x;
    this.y = y;
    this.w = w;
  }

  show() {
    stroke(0);
    //{!2} If the cell is born, color it blue!
    if (this.previous === 0 && this.state == 1) {
      fill(0, 0, 255);
    } else if (this.state == 1) {
      fill(0);
      //{!2} If the cell dies, color it red!
    } else if (this.previous == 1 && this.state === 0) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    square(this.x, this.y, this.w);
  }
}
