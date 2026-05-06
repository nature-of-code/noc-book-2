// The Nature of Code Exercise 8.9
// Solution by Rick Sidwell
// http://natureofcode.com

// Fractal tree Branch class
// Defines one branch in a fractal tree
// A branch with negative length is actually a leaf

class Branch {
  constructor(start, angle, len) {
    // A branch is defined by its start point, angle, and length
    this.start = start;
    this.angle = angle;
    this.len = len;
    
    // The end point for the branch is not used by the branch itself,
    // but will be the start point for branches that emanate from it.
    // As it changes over time, it will also change those start points.
    this.end = p5.Vector.add(
      this.start,
      p5.Vector.fromAngle(this.angle, this.len)
    );
    
    // r is used by noise to give each branch slightly different random behavior
    this.r = random()/3;
  }

  show(t, maxLen) {
    if (this.len > 0) {
      // Show branch
      let angleNoise = map(noise(t, this.r), 0.3, 0.7, -PI/5, PI/5);
      let weight = map(this.len, 2, maxLen, 1, 15);
      stroke("saddlebrown");
      strokeWeight(weight);
      let newEnd = p5.Vector.add(
        this.start,
        p5.Vector.fromAngle(this.angle + angleNoise/weight, this.len)
      );
      // Change the value of this.end, leaving it in place since the start
      // points of other branches point to it (just setting it to newEnd would
      // break the association to the other start points).
      this.end.x = newEnd.x;
      this.end.y = newEnd.y;
      line(this.start.x, this.start.y, this.end.x, this.end.y);
    } else {
      // Show leaf
      noStroke();
      fill("forestgreen");
      circle(this.start.x, this.start.y, -this.len);
    }
  }

  nextBranches() {
    let branches = [];
    branches[0] = [this.end, this.angle - PI / 8, this.len * 0.67];
    branches[1] = [this.end, this.angle + PI / 8, this.len * 0.67];
    return branches;
  }
}
