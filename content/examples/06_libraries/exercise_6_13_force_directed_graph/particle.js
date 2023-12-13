class Particle extends VerletParticle2D {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
  }

  show() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    circle(this.x, this.y, this.r * 2);
  }
}
