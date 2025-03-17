// The Nature of Code, Exercise 2.1
// Solution by Wendy Dherin
// http://natureofcode.com

class Balloon {
  constructor(width, height) {
    // start position at center of canvas
    this.position = createVector(width / 2, height / 2);
    // start velocity at 0,0
    this.velocity = createVector();
    // start acceleration at 0,0
    this.acceleration = createVector();
    // helium is a small upward-only force
    this.helium = createVector(0, -0.02);
    // initiate noise seed
    this.noiseX = 1000;
    // use noise to calculate initial wind force
    this.topSpeed = 5;
    this.diameter = height / 5;
    this.strokeWeight = 1;
    this.triangleSize = 5;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // returns true if the top of the balloon has exceeded the top of the canvas (0)
  shouldBounce() {
    // top of balloon is the position.y (the center of the circle),
    // minus half the diameter (the radius),
    // minus 1 (the strokeWeight)
    return this.position.y - this.diameter / 2 - this.strokeWeight < 0;
  }

  update() {
    // check to see if balloon has hit the ceiling,
    // and if so, send it backwards
    if (this.shouldBounce()) {
      // reset position.y so that it's below the ceiling
      this.position.y = this.diameter / 2 - this.strokeWeight + 2;
      // this.acceleration.mult(-1)
      // Lose speed when bouncing
      this.velocity.y *= -0.75;
    }

    // apply helium and wind forces
    this.applyForce(this.helium);

    // Use Perlin noise to randomly control force of wind.
    // Wind will always blow to the right, and sometimes up a little, sometimes down a little
    let windX = map(noise(this.noiseX), 0, 1, -0.01, 0.01);
    let wind = createVector(windX, 0);

    this.applyForce(wind);

    this.velocity.add(this.acceleration);
    // make sure velocity doesn't exceed top speed
    this.velocity.limit(this.topSpeed);
        
    this.position.add(this.velocity);
    this.checkSides();
    this.acceleration.mult(0);
    this.noiseX += 0.01;
  }

  // reset position.x when balloon travels offscreen to the right or left
  checkSides() {
    if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = width;
    }
  }

  show() {
    stroke(0);
    strokeWeight(this.strokeWeight);

    // the balloon
    fill("pink");
    circle(this.position.x, this.position.y, this.diameter);

    // the balloon tie
    const balloonBottom = this.position.y + this.diameter / 2;
    triangle(
      this.position.x,
      balloonBottom,
      this.position.x + this.triangleSize,
      balloonBottom + this.triangleSize,
      this.position.x - this.triangleSize,
      balloonBottom + this.triangleSize
    );

    // the string
    line(
      this.position.x,
      balloonBottom + this.triangleSize,
      this.position.x,
      balloonBottom + this.triangleSize * 20
    );
  }
}
