// The Nature of Code

// Force directed graph
// Heavily based on: http://code.google.com/p/fidgen/

class Cluster {
  // We initialize a Cluster with a number of nodes, a diameter, and centerpoint
  constructor(n, length) {
    // A cluster is a grouping of nodes
    this.particles = [];
    this.length = length;

    // Create the nodes
    for (let i = 0; i < n; i++) {
      // We can't put them right on top of each other
      let x = width / 2 + random(-1, 1);
      let y = height / 2 + random(-1, 1);
      this.particles.push(new Particle(x, y, 4));
    }

    // Connect all the nodes with a Spring
    for (let i = 0; i < this.particles.length - 1; i++) {
      let particle_i = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        let particle_j = this.particles[j];
        // A Spring needs two particles, a resting length, and a strength
        physics.addSpring(
          new VerletSpring2D(particle_i, particle_j, length, 0.01)
        );
      }
    }
  }

  show() {
    // Show all the nodes
    for (let n of this.particles) {
      n.show();
    }
  }


  showConnections(other) {
    if (!other) {
      other = this;
    stroke(0, 50);
    strokeWeight(2);
    } else {
    stroke(0, 50);
    strokeWeight(0.25);
      
    }
    for (let i = 0; i < this.particles.length; i++) {
      let pi = this.particles[i];
      for (let j = 0; j < other.particles.length; j++) {
        let pj = other.particles[j];
        line(pi.x, pi.y, pj.x, pj.y);
      }
    }
  }

  // This functons connects one cluster to another
  // Each point of one cluster connects to each point of the other cluster
  // The connection is a "VerletMinDistanceSpring"
  // A VerletMinDistanceSpring is a spring which only enforces its rest length if the
  // current distance is less than its rest length. This is handy if you just want to
  // ensure objects are at least a certain distance from each other, but don't
  // care if it's bigger than the enforced minimum.
  connect(other) {
    for (let i = 0; i < this.particles.length; i++) {
      let pi = this.particles[i];
      for (let j = 0; j < other.particles.length; j++) {
        let pj = other.particles[j];
        // Create the spring
        physics.addSpring(
          new VerletMinDistanceSpring2D(
            pi,
            pj,
            (this.length + other.length) * 0.5,
            0.05
          )
        );
      }
    }
  }
}
