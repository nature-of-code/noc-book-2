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

  // Drawing the box
  show() {
    let a = this.body.angle;
    let pos = this.part1.position;

    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    rect(0,0,this.w,this.h);
    circle(0, -this.h/2, this.r * 2);
    pop();
  }
}
