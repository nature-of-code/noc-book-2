// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Koch Curve
// A class to describe one line segment in the fractal
// Includes methods to calculate midp5.Vectors along the line according to the Koch algorithm

class KochLine {
  constructor(a, b) {
    // Two p5.Vectors,
    // start is the "left" p5.Vector and
    // end is the "right p5.Vector
    this.start = a.copy();
    this.end = b.copy();
  }

  show() {
    stroke(0);
    strokeWeight(2);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  kochA() {
    return this.start.copy();
  }

  // This is easy, just 1/3 of the way
  kochB() {
    let b = p5.Vector.sub(this.end, this.start);
    b.div(3);
    b.add(this.start);
    return b;
  }

  kochC() {
    //{!1} Start at the beginning.
    let c = this.start.copy();

    let v = p5.Vector.sub(this.end, this.start);
    //{!1} Move 1/3rd of the way to point B.
    v.div(3);
    c.add(v);

    //{!1} Rotate by -PI/3 radians (negative angle so it rotates "up").
    v.rotate(-PI / 3);
    //{!1} Move along that vector to point C.
    c.add(v);

    return c;
  }

  // Easy, just 2/3 of the way
  kochD() {
    let d = p5.Vector.sub(this.end, this.start);
    d.mult(2 / 3);
    d.add(this.start);
    return d;
  }

  kochE() {
    return this.end.copy();
  }
}
