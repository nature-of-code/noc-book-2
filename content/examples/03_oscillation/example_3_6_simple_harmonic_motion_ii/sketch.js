// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let angle = 0;
let angleVelocity = 0.05;

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);

  let amplitude = 200;
  let x = amplitude * sin(angle);
  angle += angleVelocity;

  translate(width / 2, height / 2);

  stroke(0);
  strokeWeight(2);
  fill(127);
  line(0, 0, x, 0);
  circle(x, 0, 48);
}
