// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

class Flock {

  constructor() {
    // An array for all the boids
    this.boids = []; // Initialize the array
  }

  run() {
    for (let boid of this.boids) {
      boid.run();
    }
  }

  addBoid(boid) {
    this.boids.push(boid);
  }
}