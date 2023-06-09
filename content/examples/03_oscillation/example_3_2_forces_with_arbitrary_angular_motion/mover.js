// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Mover {
  constructor(x, y, mass) {
    this.mass = mass;
    this.radius = this.mass * 8;
    this.position = createVector(x, y);
    this.angle = 0;
    this.angleVelocity = 0;
    this.angleAcceleration = 0;
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.angleAcceleration = this.acceleration.x / 10.0;
    this.angleVelocity += this.angleAcceleration;
    this.angleVelocity = constrain(this.angleVelocity, -0.1, 0.1);
    this.angle += this.angleVelocity;
    this.acceleration.mult(0);
  }

  show() {
    strokeWeight(2);
    stroke(0);
    fill(127, 127);
    rectMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    circle(0, 0, this.radius * 2);
    line(0, 0, this.radius, 0);
    pop();
  }
}
