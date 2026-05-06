// The Nature of Code Exercise 8.3
// Solution by Rick Sidwell
// http://natureofcode.com

// Koch Curve animated with rotating segments
// Based on The Nature of Code Example 8.5
// The KochLine class has an extra variable, theta, which is the amount
// the segment is rotated around the origin before being drawn.
// The origin is moved the the center of the canvas and the background
// has slight transparency so the rotating segments have small trails.
// The theta value for each segment is incremented each draw cycle.

// An array for all the line segments
let segments = [];

function setup() {
  createCanvas(640, 240);
  // Left side of canvas
  let start = createVector(-width/2, 190);
  // Right side of canvas
  let end = createVector(width/2, 190);

  // The first KochLine object
  segments.push(new KochLine(start, end, 0));

  // Apply the Koch rules five times.
  for (let i = 0; i < 5; i++) {
    generate();
  }
  background(255);
}

function draw() {
  background(255, 20);
  translate(width/2, height/2);
  for (let segment of segments) {
    segment.show();
    let dir = (segment.start.x > 0) ? -1 : 1;
    segment.theta += dir * 0.025 * (1 - abs(segment.start.x) / width);
  }
}


function generate() {
  // Create the next array
  let next = [];
  // For every segment
  for (let segment of segments) {
    // Calculate 5 koch p5.Vectors (done for us by the line object)
    let [a, b, c, d, e] = segment.kochPoints();
    // Make line segments between all the vectors and add them
    next.push(new KochLine(a, b, 0));
    next.push(new KochLine(b, c, 0));
    next.push(new KochLine(c, d, 0));
    next.push(new KochLine(d, e, 0));
  }
  // The next segments!
  segments = next;
}
