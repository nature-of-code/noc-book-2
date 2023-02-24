// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class ParticleSystem {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  run() {
    // Run every particle
    // ES6 for..of loop
    for (let particle of this.particles) {
      particle.run();
    }

    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter((particle) => !particle.isDead());
  }

  // A function to apply a force to all Particles
  applyForce(f) {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].applyForce(f);
    }
  }
}
