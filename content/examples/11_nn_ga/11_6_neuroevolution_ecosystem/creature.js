class Creature {
  constructor(x, y, brain) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.fullSize = 12;
    this.r = this.fullSize;
    this.maxspeed = 2;
    this.sensors = [];
    this.health = 100;

    let totalSensors = 15;
    for (let i = 0; i < totalSensors; i++) {
      let a = map(i, 0, totalSensors, 0, TWO_PI);
      let v = p5.Vector.fromAngle(a);
      v.mult(this.fullSize * 1.5);
      this.sensors[i] = new Sensor(v);
    }

    if (brain) {
      this.brain = brain;
    } else {
      this.brain = ml5.neuralNetwork({
        inputs: this.sensors.length,
        outputs: 2,
        task: "regression",
        neuroEvolution: true,
      });
    }
  }

  reproduce() {
    let brain = this.brain.copy();
    brain.mutate(0.1);
    return new Creature(this.position.x, this.position.y, brain);
  }

  eat() {
    for (let i = 0; i < food.length; i++) {
      let d = p5.Vector.dist(this.position, food[i].position);
      if (d < this.r + food[i].r) {
        this.health += 0.5;
        food[i].r -= 0.05;
        if (food[i].r < 20) {
          food[i] = new Food();
        }
      }
    }
  }

  think() {
    for (let i = 0; i < this.sensors.length; i++) {
      this.sensors[i].value = 0;
      for (let j = 0; j < food.length; j++) {
        this.sensors[i].sense(this.position, food[j]);
      }
    }
    let inputs = [];
    for (let i = 0; i < this.sensors.length; i++) {
      inputs[i] = this.sensors[i].value;
    }

    // Predicting the force to apply
    const outputs = this.brain.predictSync(inputs);
    let angle = outputs[0].value * TWO_PI;
    let magnitude = outputs[1].value;
    let force = p5.Vector.fromAngle(angle).setMag(magnitude);
    this.applyForce(force);
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
    this.health -= 0.25;
  }

  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    for (let sensor of this.sensors) {
      stroke(0, this.health * 2);
      line(0, 0, sensor.v.x, sensor.v.y);
      if (sensor.value > 0) {
        fill(255, sensor.value * 255);
        stroke(0, 100);
        circle(sensor.v.x, sensor.v.y, 4);
      }
    }
    noStroke();
    fill(0, this.health * 2);
    this.r = map(this.health, 0, 100, 2, this.fullSize);
    this.r = constrain(this.r, 2, this.fullSize);
    circle(0, 0, this.r * 2);
    pop();
  }
}
