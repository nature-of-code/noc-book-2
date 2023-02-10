// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topspeed = 5;
  }

  update() {

    let mouse = createVector(mouseX, mouseY);
    // Step 1: Compute direction
    let dir = p5.Vector.sub(mouse, this.position);

    // Step 2: Normalize
    dir.normalize();

    // Step 3: Scale
    dir.mult(0.2);
    
    // Steps 2 and 3 could be combined into:
    // dir.setMag(0.2);

    // Step 4: Accelerate
    this.acceleration = dir;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);

  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 48);
  }
}
