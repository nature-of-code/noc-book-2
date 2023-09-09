// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// DNA is an array of vectors

class DNA {
  constructor() {
    // The genetic sequence
    this.genes = [];
    // The maximum strength of the forces
    this.maxforce = 0.1;
    for (let i = 0; i < lifeSpan; i++) {
      let angle = random(TWO_PI);
      this.genes[i] = p5.Vector.fromAngle(angle);
      this.genes[i].mult(random(0, this.maxforce));
    }
  }

  // CROSSOVER
  // Creates new DNA sequence from two (this & and a partner)
  crossover(partner) {
    // The child is a new instance of DNA.
    // (Note that the genes are generated randomly in DNA constructor,
    // but the crossover function will override the array.)
    let child = new DNA();

    //{!1} Picking a random “midpoint” in the genes array
    let midpoint = floor(random(this.genes.length));

    for (let i = 0; i < this.genes.length; i++) {
      // Before the midpoint genes from this DNA
      if (i < midpoint) {
        child.genes[i] = this.genes[i];
        // After the midpoint from the partner DNA
      } else {
        child.genes[i] = partner.genes[i];
      }
    }
    return child;
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
