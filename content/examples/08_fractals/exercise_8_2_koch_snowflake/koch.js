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
    this.a = a.copy();
    this.b = b.copy();
  }

  show() {
    stroke(0);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }

  kochA() {
    return this.a.copy();
  }

  // This is easy, just 1/3 of the way
  kochB() {
    let v = p5.Vector.sub(this.b, this.a);
    v.div(3);
    v.add(this.a);
    return v;
  }

  kochC() {
    //{!1} Start at the beginning.
    let a = this.a.copy();

    let v = p5.Vector.sub(this.b, this.a);
    //{!1} Move 1/3rd of the way to point B.
    v.div(3);
    a.add(v);

    //{!1} Rotate by -PI/3 radians (negative angle so it rotates "up").
    v.rotate(-PI / 3);
    //{!1} Move along that vector to point c.
    a.add(v);

    return a;
  }

  // Easy, just 2/3 of the way
  kochD() {
    let v = p5.Vector.sub(this.b, this.a);
    v.mult(2 / 3);
    v.add(this.a);
    return v;
  }

  kochE() {
    return this.b.copy();
  }
}
