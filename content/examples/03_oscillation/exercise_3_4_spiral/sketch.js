// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A Polar coordinate, radius now starts at 0 to spiral outwards
let r = 0;
let theta = 0;

function setup() {
  createCanvas(640,240);
  background(255);
}

function draw() {
  // Polar to Cartesian conversion
  let x = r * cos(theta);
  let y = r * sin(theta);

  // Draw an ellipse at x,y
  noStroke();
  fill(0);
  // Adjust for center of window
  circle(x+width/2, y+height/2, 16); 

  // Increment the angle
  theta += 0.01;
  // Increment the radius
  r += 0.05;
}