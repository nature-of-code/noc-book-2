// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// Rocket class -- this is just like our Boid / Particle class
// the only difference is that it has DNA & fitness

//constructor
class Rocket {
  constructor(position, dna) {
    // All of our physics stuff
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = position.copy();
    // Size
    this.r = 4;
    // Fitness and DNA
    this.fitness = 0;
    this.dna = dna;
    // To count which force we're on in the genes
    this.geneCounter = 0;

    this.hitTarget = false; // Did I reach the target
  }

  // Fitness function
  // fitness = one divided by distance squared
  calcFitness() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    this.fitness = pow(1 / d, 2);
  }

  // Run in relation to all the obstacles
  // If I'm stuck, don't bother updating or checking for intersection
  run() {
    this.checkTarget(); // Check to see if we've reached the target
    if (!this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
    }
    this.show();
  }

  // Did I make it to the target?
  checkTarget() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    if (d < 12) {
      this.hitTarget = true;
    }
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    let angle = this.velocity.heading() + PI / 2;
    let r = this.r;
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);

    // Thrusters
    rectMode(CENTER);
    fill(0);
    rect(-r / 2, r * 2, r / 2, r);
    rect(r / 2, r * 2, r / 2, r);

    // Rocket body
    fill(200);
    beginShape(TRIANGLES);
    vertex(0, -r * 2);
    vertex(-r, r * 2);
    vertex(r, r * 2);
    endShape(CLOSE);

    pop();
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }
}
