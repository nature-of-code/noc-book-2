// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Child class constructor
class Confetti extends Particle {
  // Override the show method
  show() {
    rectMode(CENTER);
    fill(127, this.lifespan);
    stroke(0, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    let theta = map(this.position.x, 0, width, 0, TWO_PI * 2);
    rotate(theta);
    square(0, 0, 12);
    pop();
  }
}
