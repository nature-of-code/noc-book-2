// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// DNA is an array of vectors

class DNA {
  constructor(genes) {
    // The maximum strength of the forces
    this.maxforce = 0.1;

    // The genetic sequence
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      // Constructor (makes a DNA of random PVectors)
      for (let i = 0; i < lifeSpan; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].mult(random(0, this.maxforce));
      }
    }

    // Let's give each Rocket an extra boost of strength for its first frame
    this.genes[0].normalize();
  }

  // CROSSOVER
  // Creates new DNA sequence from two (this & and a partner)
  crossover(partner) {
    let child = new Array(this.genes.length);
    // Pick a midpoint
    let crossover = int(random(this.genes.length));
    // Take "half" from one and "half" from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > crossover) child[i] = this.genes[i];
      else child[i] = partner.genes[i];
    }
    let newgenes = new DNA(child);
    return newgenes;
  }

  // Based on a mutation probability, picks a new random Vector
  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].mult(random(0, this.maxforce));
      }
    }
  }
}
