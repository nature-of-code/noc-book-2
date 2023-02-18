// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);

  let period = 120;
  let amplitude = 200;

  // Calculating horizontal position according to formula for simple harmonic motion
  let x = amplitude * sin((TWO_PI * frameCount) / period);

  stroke(0);
  strokeWeight(2);
  fill(127);
  translate(width / 2, height / 2);
  line(0, 0, x, 0);
  ellipse(x, 0, 48, 48);
}
