class Particle extends VerletParticle2D {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
    physics.addBehavior(new AttractionBehavior(this, r * 2, -2));
    physics.addParticle(this);
  }

  show() {
    fill(127);
    stroke(0);
    circle(this.x, this.y, this.r * 2);
  }
}
