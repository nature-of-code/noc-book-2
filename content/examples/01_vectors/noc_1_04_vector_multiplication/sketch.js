// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Example 1-4: Vector multiplication

function setup() {
  createCanvas(640,360);
}

function draw() {
  background(51);

  let mouse = createVector(mouseX,mouseY);
  let center = createVector(width/2,height/2);
  mouse.sub(center);

  // Multiplying a vector!  The vector is now half its original size (multiplied by 0.5).
  mouse.mult(0.5);

  translate(width/2,height/2);
  strokeWeight(2);
  stroke(255);
  line(0,0,mouse.x,mouse.y);
}