// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Bridge {
  constructor(len) {
    this.r = len / 2;
    this.len = len;
    this.particles = [];
    this.constraints = [];
    let y = 50;
    for (let x = 0; x < width + len; x += len) {
      let particle = Bodies.circle(x, y, this.r, { restitution: 0.6 });
      this.particles.push(particle);
      Composite.add(engine.world, particle);
    }
    this.particles[0].isStatic = true;
    this.particles[this.particles.length - 1].isStatic = true;

    for (let i = 0; i < this.particles.length - 1; i++) {
      let options = {
        bodyA: this.particles[i],
        bodyB: this.particles[i + 1],
        length: len,
        stiffness: 1,
      };
      let constraint = Matter.Constraint.create(options);
      Composite.add(engine.world, constraint);
    }
  }

  show() {
    fill(127);
    noStroke();
    for (let particle of this.particles) {
      push();
      translate(particle.position.x, particle.position.y);
      circle(0, 0, this.r * 2);
      pop();
    }
  }
}
