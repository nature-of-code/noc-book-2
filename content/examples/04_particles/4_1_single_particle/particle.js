// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

class Particle {

  constructor(x,y) {
    this.position =  createVector(x, y);
    //{!1 .offset-top} For demonstration purposes the Particle has a random velocity.
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255.0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }


  show() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  //{!3} Keeping the same physics model as with previous chapters
  applyForce(force) {
    this.acceleration.add(force);
  }

  //{!3} Is the Particle alive or dead?
  isDead() {
    return (this.lifespan < 0);
  }
}