// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// L-System
// Just demonstrating working with L-System strings
// No drawing

// Start with 'A'
let current = "A";
// Number of  generations
let count = 0;
let y = 12;

function setup() {
  createCanvas(640, 240);
  background(255);
  noLoop();
}

function mousePressed() {
  generate();
  redraw();
  y += 12;
}

function draw() {
  fill(0);
  noStroke();
  text(current, 0, y);

}

function generate() {
  // A new StringBuffer for the next generation
  let next = "";

  // Look through the current String to replace according to L-System rules
  for (let i = 0; i < current.length; i++) {
    let c = current.charAt(i);
    if (c === "A") {
      // If we find A replace with AB
      next += "AB";
    } else if (c === "B") {
      // If we find B replace with A
      next += "A";
    } else {
    }
  }
  // The current String is now the next one
  current = next;
}
