// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// An object for a draggable attractive body in our world

class Attractor {
  constructor(x, y) {
    this.radius = 32;
    this.body = Bodies.circle(x, y, this.radius, { isStatic: true });
    Composite.add(engine.world, this.body);
  }

  attract(mover) {
    let force = Vector.sub(this.body.position, mover.body.position);
    let distance = Vector.magnitude(force);
    distance = constrain(distance, 5, 25);

    let G = 0.02;
    let strength = (G * 1 * mover.body.mass) / (distance * distance);
    force = Vector.normalise(force);
    force = Vector.mult(force, strength);
    return force;
  }

  show() {
    fill(0);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    circle(0, 0, this.radius * 2);
    pop();
  }
}
