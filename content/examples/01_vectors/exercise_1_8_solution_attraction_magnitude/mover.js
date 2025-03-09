// The Nature of Code, Exercise 1.8
// Solution by Wendy Dherin
// http://natureofcode.com

class Mover {
  constructor(width, height) {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector();
    this.topSpeed = 5;
    this.diameter = 48;
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    // Step 1: Compute direction
    let direction = p5.Vector.sub(mouse, this.position);

    // Step 2: Calculate the target magnitude based on the distance
    // from the mouse (which is the same as the magnitude of the direction vector)
    let newMagnitude = map(direction.mag(), 0, max(width, height), 0, 0.2);

    // Step 3: Normalize
    direction.normalize();

    // Step 4: Scale to the new magnitude
    direction.mult(newMagnitude);

    // Steps 3 and 4 could be combined into:
    // dir.setMag(newMagnitude)

    // Step 5: Accelerate
    this.acceleration = direction;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, this.diameter);
  }
}
