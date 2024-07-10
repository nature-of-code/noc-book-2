class Food {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.r = 32;
  }

  show() {
    noStroke();
    fill(0, 100);
    circle(this.position.x, this.position.y, this.r * 2);
  }
}
