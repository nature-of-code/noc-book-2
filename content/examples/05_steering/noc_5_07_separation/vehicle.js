// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Vehicle object

class Vehicle {
  constructor(x, y) {
    // All the usual stuff
    this.position = createVector(x, y);
    this.r = 12;
    this.maxspeed = 3; // Maximum speed
    this.maxforce = 0.2; // Maximum steering force
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Separation
  // Method checks for nearby vehicles and steers away
  separate(vehicles) {
    //{!1 .bold} Note how the desired separation is based
    // on the Vehicle’s size.
    let desiredSeparation = this.r * 2;
    let sum = createVector();
    let count = 0;
    for (let other of vehicles) {
      const d = p5.Vector.dist(this.position, other.position);
      if (this != other && d < desiredSeparation) {
        let diff = p5.Vector.sub(this.position, other.position);
        //{!1 .bold} What is the magnitude of the p5.Vector
        // pointing away from the other vehicle?
        // The closer it is, the more the vehicle should flee.
        // The farther, the less. So the magnitude is set
        // to be inversely proportional to the distance.
        diff.setMag(1 / d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.setMag(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  show() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    circle(0, 0, this.r);
    pop();
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
}
