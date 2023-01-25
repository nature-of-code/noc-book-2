// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of normalizing a vector.
// Normalizing a vector sets its length to 1.

function setup() {
  createCanvas(640,240);
}

function draw() {
  background(255);

  // A vector that points to the mouse position
  let mouse = createVector(mouseX,mouseY);
  // A vector that points to the center of the window
  let center = createVector(width/2,height/2);
  // Subtract center from mouse which results in a vector that points from center to mouse
  mouse.sub(center);

  // Normalize the vector
  mouse.normalize();

  // Multiply its length by 50
  mouse.mult(50);

  translate(width/2,height/2);
  // Draw the resulting vector
  stroke(0);
  strokeWeight(2);
  line(0,0,mouse.x,mouse.y);
}
