let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
let { GravityBehavior } = toxi.physics2d.behaviors;

let physics;

let particles = [];

function setup() {
  createCanvas(640, 240);

  // Creating a toxiclibs Verlet physics world
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  let spacing = 10;
  let total = 20;
  for (let i = 0; i < total; i++) {
    //{!1} Spacing them out along the x-axis
    let particle = new Particle(width / 2 + i * spacing, 0, 16);
    //{!1} Add the particle to the physics world.
    physics.addParticle(particle);
    //{!1} Add the particle to the array.
    particles.push(particle);
  }

  for (let i = 0; i < total - 1; i++) {
    let spring = new VerletSpring2D(
      particles[i],
      particles[i + 1],
      spacing,
      0.2
    );
    physics.addSpring(spring);
  }

  particles[0].lock();
}

function draw() {
  //{!1} Must update the physics
  physics.update();

  background(255);

  stroke(0);
  noFill();
  beginShape();
  for (let particle of particles) {
    //{!1} Each particle is one point in the line.
    vertex(particle.x, particle.y);
  }
  endShape();
  //{!1} This draws the last particle as a circle.
  particles[particles.length - 1].show();

  //{!4} Move particle according to mouse
  if (mouseIsPressed) {
    particles[particles.length - 1].lock();
    particles[particles.length - 1].x = mouseX;
    particles[particles.length - 1].y = mouseY;
    particles[particles.length - 1].unlock();
  }
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
