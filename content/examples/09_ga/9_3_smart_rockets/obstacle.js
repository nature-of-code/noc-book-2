// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// A class for an obstacle, just a simple rectangle that is drawn
// and can check if a Rocket touches it

// Also using this class for target position

class Obstacle {
  constructor(x, y, w, h) {
    this.position = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  show() {
    stroke(0);
    fill(175);
    strokeWeight(2);
    rectMode(CORNER);
    rect(this.position.x, this.position.y, this.w, this.h);
  }

  contains(spot) {
    return (
      spot.x > this.position.x &&
      spot.x < this.position.x + this.w &&
      spot.y > this.position.y &&
      spot.y < this.position.y + this.h
    );
  }
}
