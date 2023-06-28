// Coding Train / Daniel Shiffman

const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

const { GravityBehavior } = toxi.physics2d.behaviors;

const { Vec2D, Rect } = toxi.geom;

let physics;

let particles = [];
let springs = [];

function setup() {
  createCanvas(640, 240);

  physics = new VerletPhysics2D();

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  particles.push(new Particle(200, 25));
  particles.push(new Particle(400, 25));
  particles.push(new Particle(350, 125));
  particles.push(new Particle(400, 225));
  particles.push(new Particle(200, 225));
  particles.push(new Particle(250, 125));

  springs.push(new Spring(particles[0], particles[1]));
  springs.push(new Spring(particles[1], particles[2]));
  springs.push(new Spring(particles[2], particles[3]));
  springs.push(new Spring(particles[3], particles[4]));
  springs.push(new Spring(particles[4], particles[5]));
  springs.push(new Spring(particles[5], particles[0]));
  springs.push(new Spring(particles[5], particles[2]));
  springs.push(new Spring(particles[0], particles[3]));
  springs.push(new Spring(particles[1], particles[4]));
}

function draw() {
  background(255);

  physics.update();

  fill(127);
  stroke(0);
  strokeWeight(2);
  beginShape();
  for (let particle of particles) {
    vertex(particle.x, particle.y);
  }
  endShape(CLOSE);

  if (mouseIsPressed) {
    particles[0].lock();
    particles[0].x = mouseX;
    particles[0].y = mouseY;
    particles[0].unlock();
  }
}
