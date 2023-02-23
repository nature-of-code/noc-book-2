// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smoke Particle System

// A class to describe a group of Particles
// An ArrayList is used to manage the list of Particles

class ParticleSystem {

  constructor(num, v, img) {
    this.particles = []; // Initialize the arraylist
    this.origin = v.copy(); // Store the origin point
    this.img = img;
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.origin, this.img)); // Add "num" amount of particles to the arraylist
    }
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }
    this.particles = this.particles.filter(particle => !particle.isDead());
  }

  // Method to add a force vector to all particles currently in the system
  applyForce(dir) {
    // Enhanced loop!!!
    for (let particle of this.particles) {
      particle.applyForce(dir);
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin, this.img));
  }

}
