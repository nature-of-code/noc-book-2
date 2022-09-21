// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let angle = 0;
let aVelocity = 0.03;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(51);

  let amplitude = 300;
  let x = amplitude * sin(angle);
  angle += aVelocity;

  translate(width / 2, height / 2);

  stroke(255);
  fill(127);
  line(0, 0, x, 0);
  ellipse(x, 0, 48, 48);
}