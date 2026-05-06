// The Nature of Code Exercise 8.5
// Solution by Rick Sidwell
// http://natureofcode.com

let minLen = 5;

function setup() {
  createCanvas(640, 240);
  translate(width / 2, height / 2);
  fill(0);
  noStroke();

  // Corners of the Sierpinki triangle
  let y = height / 2;
  let x = y / sin(PI / 3);
  let p1 = createVector(0, -y);
  let p2 = createVector(-x, y);
  let p3 = createVector(x, y);

  sierpinski(p1, p2, p3);
}

function sierpinski(p1, p2, p3) {
  // Compute vectors between each pair of points
  let v1 = p5.Vector.sub(p2, p1); // From p1 to p2
  let v2 = p5.Vector.sub(p3, p2); // From p2 to p3
  let v3 = p5.Vector.sub(p1, p3); // From p3 to p1

  if (v1.mag() < minLen || v2.mag < minLen || v3.mag < minLen) {
    // We've reached the end; draw the triangle
    triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  } else {
    // Recursively create sub-triangles
    sierpinski(
      p1,
      p5.Vector.add(p1, p5.Vector.div(v1, 2)),
      p5.Vector.add(p1, p5.Vector.div(v3, -2))
    );
    sierpinski(
      p2,
      p5.Vector.add(p2, p5.Vector.div(v2, 2)),
      p5.Vector.add(p2, p5.Vector.div(v1, -2))
    );
    sierpinski(
      p3,
      p5.Vector.add(p3, p5.Vector.div(v3, 2)),
      p5.Vector.add(p3, p5.Vector.div(v2, -2))
    );
  }
}
