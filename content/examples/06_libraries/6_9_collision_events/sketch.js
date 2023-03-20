const { Engine, Bodies, Composite, Constraint, Body, Vector } = Matter;

let engine;

let particles = [];
let wall;

function setup() {
  createCanvas(640, 240);
  engine = Engine.create();
  wall = new Boundary(width / 2, height - 5, width, 10);
  Matter.Events.on(engine, "collisionStart", handleCollisions);
}

function handleCollisions(event) {
  for (let pair of event.pairs) {
    let bodyA = pair.bodyA;
    let bodyB = pair.bodyB;

    //{!2} When we pull the “user data” object out of the Body object, we have to remind our program that it is a Particle object.  Box2D doesn’t know this.
    let particleA = bodyA.plugin.particle;
    let particleB = bodyB.plugin.particle;
    
    //{!4} Once we have the particles, we can do anything to them.  Here we just call a function that changes their color.
    if (particleA instanceof Particle && particleB instanceof Particle) {
      particleA.change();
      particleB.change();
    }
    
  }
}

function draw() {
  background(255);
  if (random(1) < 0.05) {
    particles.push(new Particle(random(width), 0));
  }
  Engine.update(engine);


  // Iterate over the boxes backwards
  for (let i = particles.length-1; i >= 0; i--) {
    particles[i].show();
    // Remove the Body from the world and the array
    if (particles[i].checkEdge()) {
      particles[i].removeBody();
      particles.splice(i, 1);
    }
  }
  wall.show();
}
