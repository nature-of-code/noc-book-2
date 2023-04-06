// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Re-implementing java.awt.Rectangle
// so JS mode works

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  contains(px, py) {
    return (px > this.x && px < this.x + this.width && py > this.y && py < this.y + this.height);
  }
}