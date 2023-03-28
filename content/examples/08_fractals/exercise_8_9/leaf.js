class Leaf {
  constructor(position) {
    this.pos = position.copy();
  }

  show() {
    noStroke();
    fill(50, 100);
    circle(this.pos.x, this.pos.y, 4);
  }
}
