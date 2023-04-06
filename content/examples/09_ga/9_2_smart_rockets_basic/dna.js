// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// DNA is an array of vectors

class DNA {
  constructor(newgenes) {
    if (arguments.length > 0) {
      this.genes = newgenes;
    } else {
      // The genetic sequence
      this.genes = [];
      // The maximum strength of the forces
      this.maxforce = 0.1;
      for (let i = 0; i < lifetime; i++) {
        let angle = random(TWO_PI);
        this.genes[i] = p5.Vector.fromAngle(angle);
        this.genes[i].mult(random(0, this.maxforce));
      }
    }
  }

  // CROSSOVER
  // Creates new DNA sequence from two (this & and a partner)
  crossover(partner) {
    let child = [];
    // Pick a midpoint
    let crossover = floor(random(this.genes.length));
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
        let angle = random(TWO_PI);
        this.genes[i] = p5.Vector.fromAngle(angle);
        this.genes[i].mult(random(0, this.maxforce));
      }
    }
  }
}