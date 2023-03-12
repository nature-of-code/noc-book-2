// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box

class Lollipop {
  constructor(x, y) {
    this.w = 8;
    this.h = 24;
    this.r = 8;

    let options = { restitution: 1 };
    this.part1 = Bodies.rectangle(x, y, this.w, this.h, options);
    this.part2 = Bodies.circle(x, y - this.h / 2, this.r, options);

    this.body = Body.create({
      parts: [this.part1, this.part2],
    });
    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }

  // Drawing the lollipop
  show() {
    
    // TODO: Why is body.pos different from part1.pos?
    // Why is there body.angle but no part1.angle?

    let a = this.body.angle;
    let pos = this.part1.position;

    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    rect(0, 0, this.w, this.h);
    circle(0, this.h / 2, this.r * 2);
    pop();
  }

  checkEdge() {
    return this.body.position.y > height + this.h * 2;
  }

  // This function removes a body from the Matter.js world.
  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}
