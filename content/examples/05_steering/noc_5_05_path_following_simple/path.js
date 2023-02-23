// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Path Following

class Path {
  constructor() {
    // A path has a radius, i.e how far is it ok for the boid to wander off
    this.radius = 20;
    // A Path is line between two points (p5.Vector objects)
    this.start = createVector(0, height / 3);
    this.end = createVector(width, 2 * height / 3);
  }

  // Draw the path
  display() {

    strokeWeight(this.radius * 2);
    stroke(200, 100);
    line(this.start.x, this.start.y, this.end.x, this.end.y);

    strokeWeight(1);
    stroke(200);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}