// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A class to describe a group of Particles
// An ArrayList is used to manage the list of Particles


class ParticleSystem {

  constructor(imgs) {
    this.particles = [];
    this.textures = imgs;
  }

  addParticle(x, y) {
    let img = random(this.textures);
    this.particles.push(new Particle(x, y, img));
  }

  applyForce(f) {
    for (let particle of this.particles) {
      particle.applyForce(f);
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.run();
    }
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}