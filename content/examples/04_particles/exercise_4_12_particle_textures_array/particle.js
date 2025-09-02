// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

class Particle {
  // Another constructor (the one we are using here)
  constructor(x, y, img) {
    // Boring example with constant acceleration
    this.acc = createVector(0, 0);
    this.vel = p5.Vector.random2D();
    this.pos = createVector(x, y);
    this.lifespan = 255;
    this.img = img;
  }

  run() {
    this.update();
    this.render();
  }

  applyForce(f) {
    this.acc.add(f);
  }

  // Method to update position
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= 5.0;
  }

  // Method to display
  render() {
    imageMode(CENTER);
    tint(this.lifespan);
    image(this.img, this.pos.x, this.pos.y, 32, 32);
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan <= 0.0) {
      return true;
    } else {
      return false;
    }
  }
}