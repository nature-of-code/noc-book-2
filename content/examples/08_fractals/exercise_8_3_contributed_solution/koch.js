// The Nature of Code Exercise 8.3
// Solution by Rick Sidwell
// http://natureofcode.com

// Koch Curve
// A class to describe one line segment in the fractal
// Includes methods to calculate midp5.Vectors along the line according to the Koch algorithm

class KochLine {
  constructor(a, b, theta) {
    // Two p5.Vectors,
    // start is the "left" p5.Vector and
    // end is the "right p5.Vector
    // theta is the angle to rotate before drawing the line
    this.start = a.copy();
    this.end = b.copy();
    this.theta = theta;
  }

  show() {
    stroke(0);
    strokeWeight(2);
    push();
    rotate(this.theta);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    pop();
  }

  kochPoints() {
    // Just the first point!
    let a = this.start.copy();
    // Just the last point!
    let e = this.end.copy();

    // A vector pointing in the direction, 1/3rd the length
    let v = p5.Vector.sub(this.end, this.start);
    v.mult(1 / 3);

    // b is just 1/3 of the way
    let b = p5.Vector.add(a, v);
    // d is just another 1/3 of the way
    let d = p5.Vector.add(b, v);
    
    //{!1} Rotate by -PI/3 radians (negative angle so it rotates "up").
    v.rotate(-PI / 3);
    // Move along 
    let c = p5.Vector.add(b, v);
    
    // Return all five points in an array
    return [a, b, c, d, e];
  }
}
