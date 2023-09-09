// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Rocket class -- this is just like our Boid / Particle class
// the only difference is that it has DNA & fitness

class Rocket {
  constructor(x, y, dna) {
    // All of our physics stuff
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = createVector(x, y);
    this.r = 4;
    this.dna = dna;
    this.finishCounter = 0; // We're going to count how long it takes to reach target
    this.recordDistance = Infinity; // Some high number that will be beat instantly

    this.fitness = 0;
    this.geneCounter = 0;
    this.hitObstacle = false; // Am I stuck on an obstacle?
    this.hitTarget = false; // Did I reach the target
  }

  // FITNESS FUNCTION
  // distance = distance from target
  // finish = what order did i finish (first, second, etc. . .)
  // f(distance,finish) =   (1.0f / finish^1.5) * (1.0f / distance^6);
  // a lower finish is rewarded (exponentially) and/or shorter distance to target (exponetially)
  calculateFitness() {
    // Reward finishing faster and getting close
    this.fitness = 1 / (this.finishCounter * this.recordDistance);

    // Let's try to to the 4th power!
    this.fitness = pow(this.fitness, 4);

    //{!3} lose 90% of fitness hitting an obstacle
    if (this.hitObstacle) {
      this.fitness *= 0.1;
    }
    //{!3} Double the fitness for finishing!
    if (this.hitTarget) {
      this.fitness *= 2;
    }
  }

  // Run in relation to all the obstacles
  // If I'm stuck, don't bother updating or checking for intersection
  run(obstacles) {
    // Stop the rocket if it's hit an obstacle or the target
    if (!this.hitObstacle && !this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
      // Check if rocket hits an obstacle
      this.checkObstacles(obstacles);
    }
    this.show();
  }

  checkTarget() {
    let distance = p5.Vector.dist(this.position, target.position);
    //{!3} Check if the distance is closer than the “record” distance. If it is, set a new record.
    if (distance < this.recordDistance) {
      this.recordDistance = distance;
    }
    // If the object reaches the target, set a boolean flag to true.
    if (target.contains(this.position)) {
      this.hitTarget = true;
    }
    
    // Increase the finish counter if it hasn't hit the target
    if (!this.hitTarget) {      
      this.finishCounter++;
    }
  }

  // This new function lives in the Rocket class and checks if a rocket has
  // hit an obstacle.
  checkObstacles(obstacles) {
    for (let obstacle of obstacles) {
      if (obstacle.contains(this.position)) {
        this.hitObstacle = true;
      }
    }
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
    let theta = this.velocity.heading() + PI / 2;
    fill(200, 100);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    // Thrusters
    rectMode(CENTER);
    fill(0);
    rect(-this.r / 2, this.r * 2, this.r / 2, this.r);
    rect(this.r / 2, this.r * 2, this.r / 2, this.r);

    // Rocket body
    fill(200);
    beginShape(TRIANGLES);
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape();

    fill(0);
    noStroke();
    rotate(-theta);
    //text(nf(this.fitness,2,1), 5, 5);
    // text(nf(this.fitness, 1, 5), 15, 5);

    pop();
  }
}
