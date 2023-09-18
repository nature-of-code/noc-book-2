// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Koch Curve
// Renders a simple fractal, the Koch snowflake
// Each recursive level drawn in sequence

// An array for all the line segments
let segments = [];

function setup() {
  createCanvas(640, 240);
  // Left side of canvas
  let start = createVector(0, 200);
  // Right side of canvas
  let end = createVector(width, 200);

  //{!1} The first KochLine object
  segments.push(new KochLine(start, end));

  //{!3} Apply the Koch rules five times.
  for (let i = 0; i < 5; i++) {
    generate();
  }
}

function draw() {
  background(255);
  for (let segment of segments) {
    segment.show();
  }
  noLoop();
}

function generate() {
  // Create the next array
  let next = [];
  // For every segment
  for (let segment of segments) {
    // Calculate 5 koch p5.Vectors (done for us by the line object)
    let [a, b, c, d, e] = segment.kochPoints();
    // Make line segments between all the vectors and add them
    next.push(new KochLine(a, b));
    next.push(new KochLine(b, c));
    next.push(new KochLine(c, d));
    next.push(new KochLine(d, e));
  }
  // The next segments!
  segments = next;
}
