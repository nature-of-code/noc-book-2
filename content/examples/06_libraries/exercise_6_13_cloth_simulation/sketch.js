let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
let { GravityBehavior } = toxi.physics2d.behaviors;
let cols = 65;
let rows = 20;

let particles = make2DArray(cols, rows);
let springs = [];

let w = 10;

let physics;

function setup() {
  createCanvas(640, 240);
  physics = new VerletPhysics2D();
  let gravity = new Vec2D(0, 1);
  let gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);

  let x = 0;
  for (let i = 0; i < cols; i++) {
    let y = 0;
    for (let j = 0; j < rows; j++) {
      let p = new Particle(x, y);
      particles[i][j] = p;
      physics.addParticle(p);
      y = y;
    }
    x = x + w;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = particles[i][j];
      if (i != cols - 1) {
        let b1 = particles[i + 1][j];
        let s1 = new Spring(a, b1);
        springs.push(s1);
        physics.addSpring(s1);
      }
      if (j != rows - 1) {
        let b2 = particles[i][j + 1];
        let s2 = new Spring(a, b2);
        springs.push(s2);
        physics.addSpring(s2);
      }
    }
  }
  for (let i = 0; i < cols; i+=4) {
    particles[i][0].lock();
  }
}

function draw() {
  background(255);
  physics.update();
  for (let s of springs) {
    s.display();
  }
}

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// How cute is this simple Particle class?!
class Particle extends VerletParticle2D {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
  }

  show() {
    fill(127);
    stroke(0);
    circle(this.x, this.y, this.r * 2);
  }
}

class Spring extends VerletSpring2D {
  constructor(a, b) {
    super(a, b, w, 0.25);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}


