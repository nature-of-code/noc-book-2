// The Nature of Code Exercise 8.4
// Solution by Rick Sidwell
// http://natureofcode.com

// Cantor Set
// Based on the Koch curve sketch from Nature of Code (Example 8.5)
// A simple way to change the Koch curve sketch to a Cantor set one
// is to delete the code that adds the two center lines from generate,
// but that would produce only the final Cantor set, not the intermediate
// ones as shown in Example 8.4. To do that, the sketch needs to keep the
// earlier generations instead of replacing them with the next one.
// But it can't run generate on the segments that have already been done,
// so it keeps track of the first segment that still needs to be processed.

// An array for all the line segments
let segments = [];

// Vertical offset between sets
let voffset = 30;

function setup() {
  createCanvas(640, 240);
  // Left side of canvas
  let start = createVector(0, 40);
  // Right side of canvas
  let end = createVector(width, 40);

  // The first CantorLine object
  segments.push(new CantorLine(start, end));
  
  // The first item in segments to process
  let first = 0;

  // Apply the rules five times.
  for (let i = 0; i < 5; i++) {
    next = segments.length;
    generate(first);
    first = next;    
  }
}

function draw() {
  background(255);
  for (let segment of segments) {
    segment.show();
  }
  noLoop();
}

function generate(first) {
  let end = segments.length;
  // For every segment between first and end
  for (let i = first; i < end; i++) {
    // Calculate 4 Cantor p5.Vectors (done for us by the line object)
    let [a, b, d, e] = segments[i].cantorPoints();
    // Offset the points vertically
    a.y += voffset;
    b.y += voffset;
    d.y += voffset;
    e.y += voffset;
    // Make two new line segments
    segments.push(new CantorLine(a, b));
    segments.push(new CantorLine(d, e));
  }
}
