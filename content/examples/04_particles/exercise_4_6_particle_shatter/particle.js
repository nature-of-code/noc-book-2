// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

class Particle {
  constructor(x, y, r) {
    this.acceleration = createVector();
    this.velocity = createVector();
    this.velocity.mult(0.5);
    this.position = createVector(x, y);
    this.lifespan = 255.0;
    this.r = r;
  }

  run() {
    this.update();
    this.display();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.95);
    this.lifespan -= 2.0;
  }

  // Method to display
  show() {
    stroke(0);
    fill(0);
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.r, this.r);
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
