// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Angle Between Two Vectors
// Using the dot product to compute the angle between two vectors

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);

  // A "vector" (really a point) to store the mouse position and screen center position
  let mousePos = createVector(mouseX, mouseY);
  let centerPos = createVector(width / 2, height / 2);

  // Aha, a vector to store the displacement between the mouse and center
  let v = p5.Vector.sub(mousePos, centerPos);
  v.normalize();
  v.mult(100);

  let xaxis = new createVector(100, 0);
  // Draw the vectors
  drawVector(v, centerPos);
  drawVector(xaxis, centerPos);

  let theta = p5.Vector.angleBetween(v, xaxis);

  fill(0);
  textSize(32);
  textFont("courier");
  text(int(degrees(theta)) + " degrees\n" + nf(theta,1,2) + " radians", 10, 160);
}

// Renders a vector object 'v' as an arrow and a position 'loc'
function drawVector(v, pos) {
  push();
  let arrowsize = 6;
  // Translate to position to render vector
  translate(pos.x, pos.y);
  stroke(0);
  strokeWeight(2);
  // Call vector heading function to get direction (pointing up is a heading of 0)
  rotate(v.heading());
  // Calculate length of vector & scale it to be bigger or smaller if necessary
  let len = v.mag();
  // Draw three lines to make an arrow
  line(0, 0, len, 0);
  line(len, 0, len - arrowsize, +arrowsize / 2);
  line(len, 0, len - arrowsize, -arrowsize / 2);
  pop();
}