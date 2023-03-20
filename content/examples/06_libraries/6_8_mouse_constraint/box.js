// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box

class Box {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;

    let options = { restitution: 0.6 };
    this.body = Bodies.rectangle(x, y, this.w, this.h, options);
    Composite.add(engine.world, this.body);
  }

  // Drawing the box
  show() {
    let pos = this.body.position;
    let a = this.body.angle;

    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
