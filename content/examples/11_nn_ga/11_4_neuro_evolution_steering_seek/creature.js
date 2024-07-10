class Creature {
  constructor(x, y, brain) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 4;
    this.maxspeed = 4;
    this.fitness = 0;

    if (brain) {
      this.brain = brain;
    } else {
      this.brain = ml5.neuralNetwork({
        inputs: 5,
        outputs: 2,
        task: "regression",
        neuroEvolution: true,
      });
    }
  }

  seek(target) {
    let v = p5.Vector.sub(target.position, this.position);
    // Save the distance in a variable and normalize according to width (one input)
    let distance = v.mag() / width;
    // Normalize the vector pointing from position to target (two inputs)
    v.normalize();
    let inputs = [
      v.x,
      v.y,
      distance,
      this.velocity.x / this.maxspeed,
      this.velocity.y / this.maxspeed,
    ];

    // Predicting the force to apply
    let outputs = this.brain.predictSync(inputs);
    let angle = outputs[0].value * TWO_PI;
    let magnitude = outputs[1].value;
    let force = p5.Vector.fromAngle(angle).setMag(magnitude);
    this.applyForce(force);
  }

  // Method to update location
  update(target) {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);

    let d = p5.Vector.dist(this.position, target.position);
    if (d < this.r + target.r) {
      this.fitness++;
    }
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  show() {
    //{!1} Vehicle is a triangle pointing in the direction of velocity
    let angle = this.velocity.heading();
    fill(127);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    beginShape();
    vertex(this.r * 2, 0);
    vertex(-this.r * 2, -this.r);
    vertex(-this.r * 2, this.r);
    endShape(CLOSE);
    pop();
  }
}
