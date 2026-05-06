// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Spring extends VerletSpring2D {
  constructor(a, b, strength) {
    let len = dist(a.x, a.y, b.x, b.y);
    super(a, b, len, 0.01);
    physics.addSpring(this);
  }

  show() {
    stroke(0);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
