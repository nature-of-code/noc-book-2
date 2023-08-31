// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    let vx = randomGaussian(0, 0.3);
    let vy = randomGaussian(-1, 0.3);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0);
    this.lifespan = 100.0;
  }

  run() {
    this.update();
    this.show();
  }

  // Method to apply a force vector to the Particle object
  // Note we are ignoring "mass" here
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
    this.acceleration.mult(0); // clear Acceleration
  }

  // Method to draw
  show() {
    // tint(255, this.lifespan);
    // imageMode(CENTER);
    // image(img, this.position.x, this.position.y);
    // Drawing a circle instead
    fill(255, this.lifespan);
    noStroke();
    circle(this.position.x, this.position.y, img.width);
  }

  // Is the particle still useful?
  isDead() {
   return (this.lifespan < 0.0);
  }
}
