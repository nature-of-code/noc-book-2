// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let block;

function setup() {
  createCanvas(640, 240);
  block = new ParticleSystem(270, 70, 10);
}

function draw() {
  background(255);
  block.show();
  block.update();
}

function mousePressed() {
  block.shatter();
  setTimeout(() => save("screenshot.png"), 300);
}
