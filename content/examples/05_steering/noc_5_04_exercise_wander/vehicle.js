// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);
    this.r = 6;
    this.wandertheta = 0.0;
    this.maxspeed = 2;
    this.maxforce = 0.05;
  }

  run() {
    this.update();
    this.borders();
    this.show();
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  wander() {
    let wanderR = 25;
    let wanderD = 80;
    let change = 0.3;
    this.wandertheta += random(-change, change);

    let circlePos = this.velocity.copy();
    circlePos.normalize();
    circlePos.mult(wanderD);
    circlePos.add(this.position);

    let h = this.velocity.heading();

    let circleOffSet = createVector(
      wanderR * cos(this.wandertheta + h),
      wanderR * sin(this.wandertheta + h)
    );
    let target = p5.Vector.add(circlePos, circleOffSet);
    this.seek(target);

    //Render wandering circle, etc.
    if (debug) this.drawWanderStuff(this.position, circlePos, target, wanderR);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    this.applyForce(steer);
  }

  show() {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  // A method just to draw the circle associated with wandering
  drawWanderStuff(location, circlePos, target, rad) {
    stroke(0);
    noFill();
    strokeWeight(1);
    circle(circlePos.x, circlePos.y, rad * 2);
    circle(target.x, target.y, 4);
    line(location.x, location.y, circlePos.x, circlePos.y);
    line(circlePos.x, circlePos.y, target.x, target.y);
  }
}
