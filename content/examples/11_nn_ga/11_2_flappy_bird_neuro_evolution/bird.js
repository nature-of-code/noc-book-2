class Bird {
  constructor(brain) {
    // A bird's brain receives 5 inputs and classifies them into one of two labels
    if (brain) {
      this.brain = brain;
    } else {
      this.brain = ml5.neuralNetwork({
        inputs: 4,
        outputs: ["flap", "no flap"],
        task: "classification",
        
        // change to "neuroEvolution" for next ml5.js release
        neuroEvolution: true,
      });
    }

    // The bird's position (x will be constant)
    this.x = 50;
    this.y = 120;

    // Velocity and forces are scalar since the bird only moves along the y-axis
    this.velocity = 0;
    this.gravity = 0.5;
    this.flapForce = -10;

    // Adding a fitness
    this.fitness = 0;
    this.alive = true;
  }

  think(pipes) {
    let nextPipe = null;
    for (let pipe of pipes) {
      if (pipe.x + pipe.w > this.x) {
        nextPipe = pipe;
        break;
      }
    }

    let inputs = [
      this.y / height,
      this.velocity / height,
      nextPipe.top / height,
      (nextPipe.x - this.x) / width,
    ];

    let results = this.brain.classifySync(inputs);
    if (results[0].label == "flap") {
      this.flap();
    }
  }

  // The bird flaps its wings
  flap() {
    this.velocity += this.flapForce;
  }

  update() {
    // Add gravity
    this.velocity += this.gravity;
    this.y += this.velocity;
    // Dampen velocity
    this.velocity *= 0.95;

    // Handle the "floor"
    if (this.y > height || this.y < 0) {
      this.alive = false;
    }

    this.fitness++;
  }

  show() {
    strokeWeight(2);
    stroke(0);
    fill(127, 200);
    circle(this.x, this.y, 16);
  }
}
