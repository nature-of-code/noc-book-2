class Windmill {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h);
    Composite.add(engine.world, this.body);

    let options = {
      bodyA: this.body,
      pointB: { x, y },
      length: 0,
      stiffness: 1,
    };
    this.constraint = Constraint.create(options);
    Composite.add(engine.world, this.constraint);
  }

  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.body.position.x, this.body.position.y);
    push();
    rotate(this.body.angle);
    rect(0, 0, this.w, this.h);
    pop();
    line(0, 0, 0, height);
    pop();
  }
}
