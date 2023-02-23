// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Particle {

  constructor(pos, img) {
    this.acc = createVector(0, 0);
    let vx = randomGaussian() * 0.3;
    let vy = randomGaussian() * 0.3 - 1.0;
    this.vel = createVector(vx, vy);
    this.pos = pos.copy();
    this.lifespan = 100.0;
    this.img = img;
  }

  run() {
    this.update();
    this.render();
  }

  // Method to apply a force vector to the Particle object
  // Note we are ignoring "mass" here
  applyForce(f) {
    this.acc.add(f);
  }

  // Method to update position
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 2.5;
    this.acc.mult(0); // clear Acceleration
  }

  // Method to display
  render() {
    imageMode(CENTER);
    tint(255, this.lifespan);
    image(img, this.pos.x, this.pos.y);
    // Drawing a circle instead
    // fill(255,lifespan);
    // noStroke();
    // ellipse(pos.x,pos.y,img.width,img.height);
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