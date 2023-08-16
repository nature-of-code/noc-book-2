// Coding Train / Daniel Shiffman

const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

const { GravityBehavior } = toxi.physics2d.behaviors;

const { Vec2D, Rect } = toxi.geom;

let physics;

let particles = [];
let eyes = [];
let springs = [];

let showSprings = false;

function keyPressed() {
  if (key == ' ') {
    showSprings = !showSprings;
  }
}

function setup() {
  createCanvas(640, 240);

  physics = new VerletPhysics2D();

  let bounds = new Rect(0, 0, width, height);
  physics.setWorldBounds(bounds);

  particles.push(new Particle(200, 25));
  particles.push(new Particle(250, 25));
  particles.push(new Particle(300, 25));
  particles.push(new Particle(350, 25));
  particles.push(new Particle(400, 25));
  particles.push(new Particle(350, 125));
  particles.push(new Particle(400, 225));
  particles.push(new Particle(350, 225));
  particles.push(new Particle(300, 225));
  particles.push(new Particle(250, 225));
  particles.push(new Particle(200, 225));
  particles.push(new Particle(250, 125));

  eyes.push(new Particle(275, 75));
  eyes.push(new Particle(325, 75));
  eyes.push(new Particle(250, -25));
  eyes.push(new Particle(350, -25));

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      if (i !== j) {
        let a = particles[i];
        let b = particles[j];
        // let b = particles[(i + 1) % particles.length];
        springs.push(new Spring(a, b));
      }
    }
  }

  for (let particle of particles) {
    springs.push(new Spring(particle, eyes[0]));
    springs.push(new Spring(particle, eyes[1]));
  }

  springs.push(new Spring(eyes[2], particles[1]));
  springs.push(new Spring(eyes[3], particles[3]));

  springs.push(new Spring(eyes[2], particles[3]));
  springs.push(new Spring(eyes[3], particles[1]));

  springs.push(new Spring(eyes[2], particles[0]));
  springs.push(new Spring(eyes[3], particles[4]));

  springs.push(new Spring(eyes[3], particles[2]));
  springs.push(new Spring(eyes[2], particles[2]));

  springs.push(new Spring(eyes[2], eyes[3]));

  springs.push(new Spring(eyes[0], eyes[3]));
  springs.push(new Spring(eyes[0], eyes[2]));
  springs.push(new Spring(eyes[1], eyes[2]));
  springs.push(new Spring(eyes[1], eyes[3]));
}

function draw() {
  background(255);

  physics.update();

  stroke(112, 50, 126);
  if (showSprings) stroke(112, 50, 126, 100);

  strokeWeight(4);
  line(particles[1].x, particles[1].y, eyes[2].x, eyes[2].y);
  line(particles[3].x, particles[3].y, eyes[3].x, eyes[3].y);
  strokeWeight(16);
  point(eyes[2].x, eyes[2].y);
  point(eyes[3].x, eyes[3].y);

  fill(45, 197, 244);
  if (showSprings) fill(45, 197, 244, 100);
  strokeWeight(2);
  beginShape();
  for (let particle of particles) {
    vertex(particle.x, particle.y);
  }
  endShape(CLOSE);

  //   fill(127, 127);
  //   stroke(0);
  //   strokeWeight(2);
  //   beginShape();
  //   for (let particle of particles) {
  //     vertex(particle.x, particle.y);
  //   }
  //   endShape(CLOSE);

  // for (let particle of particles) {
  //   particle.show();
  // }

  eyes[0].show();
  eyes[1].show();

  // for (let eye of eyes) {
  //   eye.show();
  // }

  if (showSprings) {
    for (let spring of springs) {
      spring.show();
    }
  }

  if (mouseIsPressed) {
    particles[0].lock();
    particles[0].x = mouseX;
    particles[0].y = mouseY;
    particles[0].unlock();
  }
}
