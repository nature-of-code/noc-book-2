// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
  constructor(x, y, maxspeed, maxforce) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(2, 0);
    this.r = 4;
    this.maxspeed = maxspeed;
    this.maxforce = maxforce;
  }

  run() {
    this.update();
    this.show();
  }

  // This function implements Craig Reynolds' path following algorithm
  // http://www.red3d.com/cwr/steer/PathFollow.html
  follow(path) {
    //{!3} Step 1: Predict the vehicle’s future position.
    let future = this.velocity.copy();
    future.setMag(25);
    future.add(this.position);

    //{!1} Step 2: Find the normal point along the path.
    let normalPoint = getNormalPoint(future, path.start, path.end);

    //{!3} Step 3: Move a little further along the path and set a target.
    let b = p5.Vector.sub(path.end, path.start);
    b.setMag(25);
    let target = p5.Vector.add(normalPoint, b);

    //{!5} Step 4: If we are off the path,
    // seek that target in order to stay on the path.
    let distance = p5.Vector.dist(normalPoint, future);
    if (distance > path.radius) {
      this.seek(target);
    }

    // Draw the debugging stuff
    if (debug) {
      fill(127);
      stroke(0);
      line(this.position.x, this.position.y, future.x, future.y);
      ellipse(future.x, future.y, 4, 4);

      // Draw normal location
      fill(127);
      stroke(0);
      line(future.x, future.y, normalPoint.x, normalPoint.y);
      ellipse(normalPoint.x, normalPoint.y, 4, 4);
      stroke(0);
      if (distance > path.radius) fill(255, 0, 0);
      noStroke();
      ellipse(target.x + b.x, target.y + b.y, 8, 8);
    }
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the position to the target

    // If the magnitude of desired equals 0, skip out of here
    // (We could optimize this to check if x and y are 0 to avoid mag() square root
    if (desired.mag() === 0) return;

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
  }

  // Method to update position
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // Wraparound
  borders(p) {
    if (this.position.x > p.end.x + this.r) {
      this.position.x = p.start.x - this.r;
      this.position.y = p.start.y + (this.position.y - p.end.y);
    }
  }

  show() {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading();
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }
}

// A function to get the normal point from position to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(position, a, b) {
  // Vector that points from a to position
  let vectorA = p5.Vector.sub(position, a);
  // Vector that points from a to b
  let vectorB = p5.Vector.sub(b, a);

  // Using the dot product for scalar projection
  vectorB.normalize();
  vectorB.mult(vectorA.dot(vectorB));
  //{!1} Finding the normal point along the line segment
  let normalPoint = p5.Vector.add(a, vectorB);

  return normalPoint;
}
