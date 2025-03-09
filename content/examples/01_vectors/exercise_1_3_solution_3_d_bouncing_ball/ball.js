// The Nature of Code, Exercise 1.3
// Solution by Wendy Dherin
// http://natureofcode.com

class Ball {
  constructor(width, height, boxSize) {
    this.boxSize = boxSize
    this.position = createVector(0, 0, 0)
    this.velocity = createVector(2, 6, 5)
    this.radius = 10
  }

  update() {
    this.position.add(this.velocity)
  }
  
  checkEdges() {
    // The outer edge of the ball has reached the edge
    // of the cubical box if it has traveled, from the center,
    // a distance greater than half the length of a side of the           // cubical box, minus the radius of the ball.
    //
    // We need to address this in all 3 dimensions. 
    if (
      this.position.x > this.boxSize / 2 - this.radius ||
      this.position.x < -this.boxSize / 2 + this.radius
    ) {
      this.velocity.x *= -1
    }
    if (
      this.position.y > this.boxSize / 2 - this.radius ||
      this.position.y < -this.boxSize / 2 + this.radius
    ) {
      this.velocity.y *= -1
    }
    if (
      this.position.z > this.boxSize / 2 - this.radius ||
      this.position.z < -this.boxSize / 2 + this.radius
    ) {
      this.velocity.z *= -1
    }
  }

  show() {
    push()
    translate(this.position.x, this.position.y, this.position.z)
    normalMaterial()
    sphere(this.radius)
    pop()
  }
}
