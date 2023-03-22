class Particle {
  constructor(x, y) {
    this.r = 8;
    let options = {
      restitution: 0.6,
      collisionFilter: {
        category: 0x0002,
      },
    };

    this.body = Bodies.circle(x, y, this.r, options);

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
    circle(0, 0, this.r * 2);
    line(0, 0, this.r, 0);
    pop();
  }

  checkEdge() {
    return this.body.position.y > height + this.r;
  }

  // This function removes a body from the Matter.js world.
  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}
