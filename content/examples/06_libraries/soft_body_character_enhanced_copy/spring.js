class Spring extends VerletSpring2D {
  constructor(a, b, strength) {
    let length = dist(a.x, a.y, b.x, b.y);
    super(a, b, length, 0.001);
    physics.addSpring(this);
  }

  show() {
    strokeWeight(1);
    stroke(0, 127);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
