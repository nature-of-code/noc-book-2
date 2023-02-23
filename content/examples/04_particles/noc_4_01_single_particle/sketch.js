// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let p;

function setup() {
  createCanvas(640, 360);
  p = new Particle(createVector(width / 2, 20));
}

function draw() {
  background(51);

  p.run();
  if (p.isDead()) {
    p = new Particle(createVector(width / 2, 20));
    //println("Particle dead!");
  }
}