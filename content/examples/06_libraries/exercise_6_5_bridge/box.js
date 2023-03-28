// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box

class Box {
  constructor(x, y) {
    this.w = random(8, 16);
    this.h = random(8, 16);

    let options = { restitution: 0.6 };
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }

  // Drawing the box
  show() {
    let pos = this.body.position;
    let a = this.body.angle;

    rectMode(CENTER);
    fill(0);
    stroke(0);
    strokeWeight(2);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
