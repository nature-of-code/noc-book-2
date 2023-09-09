// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// Constructor (makes a random DNA)
class DNA {
  constructor() {
    // DNA is random floating point values between 0 and 1 (!!)
    // The genetic sequence
    this.genes = [];
    for (let i = 0; i < 14; i++) {
      this.genes[i] = random(0, 1);
    }
  }

  crossover(partner) {
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

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      //{!1} Check a random number against mutation rate
      if (random(1) < mutationRate) {
        this.genes[i] = random(1);
      }
    }
  }
}
