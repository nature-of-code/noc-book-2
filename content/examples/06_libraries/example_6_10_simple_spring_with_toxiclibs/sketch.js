let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
let { GravityBehavior } = toxi.physics2d.behaviors;

let physics;
let particle1, particle2;

function setup() {
  createCanvas(640, 240);
  
  // Creating a toxiclibs Verlet physics world
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  //{!1} What is the rest length of the spring?
  let length = 120;

  // Creating two Particles
  particle1 = new Particle(width / 2, 0, 8);
  particle2 = new Particle(width / 2 + length, 0, 8);
  // Locking Particle 1 in place
  particle1.lock();
  
  // Creating one Spring
  let spring = new VerletSpring2D(particle1, particle2, length, 0.01);

  //{!3} Must add everything to the world
  physics.addParticle(particle1);
  physics.addParticle(particle2);
  physics.addSpring(spring);
}

function draw() {
  //{!1} Must update the physics
  physics.update();

  background(255);

  //{!4} Drawing everything
  stroke(0);
  line(particle1.x, particle1.y, particle2.x, particle2.y);
  particle1.show();
  particle2.show();

   //{!4} Move particle according to mouse 
  if (mouseIsPressed) {
    particle2.lock();
    particle2.x = mouseX;
    particle2.y = mouseY;
    particle2.unlock();
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