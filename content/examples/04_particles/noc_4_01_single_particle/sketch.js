// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let p;

function setup() {
  createCanvas(640, 240);
  p = new Particle(width / 2, 20);
}

function draw() {
  background(255);

  p.run();
  if (p.isDead()) {
    p = new Particle(width / 2, 20);
    //println("Particle dead!");
  }
}