// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Pendulum {
  constructor(x, y, len) {
    this.r = 12;
    this.len = len;
    this.anchor = Bodies.circle(x, y, this.r, { isStatic: true });
    this.bob = Bodies.circle(x + len, y - len, this.r, { restitution: 0.6 });

    let options = {
      bodyA: this.anchor,
      bodyB: this.bob,
      length: this.len,
    };
    this.arm = Constraint.create(options);

    Composite.add(engine.world, this.anchor);
    Composite.add(engine.world, this.bob);
    Composite.add(engine.world, this.arm);
  }

  // Drawing the box
  show() {
    fill(127);
    stroke(0);
    strokeWeight(2);

    line(
      this.anchor.position.x,
      this.anchor.position.y,
      this.bob.position.x,
      this.bob.position.y
    );

    push();
    translate(this.anchor.position.x, this.anchor.position.y);
    rotate(this.anchor.angle);
    circle(0, 0, this.r * 2);
    line(0, 0, this.r, 0);
    pop();

    push();
    translate(this.bob.position.x, this.bob.position.y);
    rotate(this.bob.angle);
    circle(0, 0, this.r * 2);
    line(0, 0, this.r, 0);
    pop();
  }
}
