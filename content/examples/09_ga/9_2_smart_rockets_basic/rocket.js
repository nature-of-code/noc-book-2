// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// Rocket class -- this is just like our Boid / Particle class
// the only difference is that it has DNA & fitness

//constructor
class Rocket {
  constructor(x, y, dna) {
    // All of our physics stuff
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = createVector(x, y);
    // Size
    this.r = 4;
    // Fitness and DNA
    this.fitness = 0;
    this.dna = dna;
    // To count which force we're on in the genes
    this.geneCounter = 0;
  }

  // Fitness function
  // fitness = one divided by distance squared
  calculateFitness() {
    let distance = p5.Vector.dist(this.position, target);
    this.fitness = 1 / (distance * distance);
  }

  // Run in relation to all the obstacles
  // If I'm stuck, don't bother updating or checking for intersection
  run() {
    this.applyForce(this.dna.genes[this.geneCounter]);
    this.geneCounter = (this.geneCounter + 1);
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
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
}
