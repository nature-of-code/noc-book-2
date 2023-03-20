class Mover {
  constructor(x, y, radius) {
    this.radius = radius;
    let options = { restitution: 1, frictionAir: 0 };
    this.body = Bodies.circle(x, y, this.radius, options);
    let angle = random(TWO_PI);
    let vel = Vector.create(2 * cos(angle), 2 * sin(angle));
    Body.setVelocity(this.body, vel);
    Composite.add(engine.world, this.body);
  }

  applyForce(force) {
    //{!1} Calling Body's applyForce() function
    Body.applyForce(this.body, this.body.position, force);
  }

  // Drawing the box
  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    circle(0, 0, this.radius * 2);
    line(0, 0, this.radius, 0);
    pop();
  }
}
