// Mutual Attract// The Nature of Code
// https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/2-forces/6-mutual-attraction

let movers = [];
let sun;

function setup() {
  createCanvas(640, 240);
  for (let i = 0; i < 100; i++) {
    let pos = p5.Vector.random2D();
    let vel = pos.copy();
    vel.setMag(random(10, 15));
    pos.setMag(random(100, 150));
    vel.rotate(PI / 2);
    let m = random(10, 15);
    movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
  }
  sun = new Mover(0, 0, 0, 0, 500);
  background(255);
}

function draw() {
  background(255, 50);
  translate(width / 2, height / 2);

  for (let mover of movers) {
    sun.attract(mover);
    for (let other of movers) {
      if (mover !== other) {
        mover.attract(other);
        // stroke(255);
        //line(mover.pos.x, mover.pos.y, other.pos.x, other.pos.y);
      }
    }
  }

  for (let mover of movers) {
    mover.update();
    mover.show();
  }
  // sun.show();
}
