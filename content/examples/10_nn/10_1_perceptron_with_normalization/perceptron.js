class Perceptron {
  constructor(totalInputs, learningRate) {
    //{!2} The Perceptron stores its weights and learning constants.
    this.weights = [];
    this.learningConstant = learningRate;
    //{!3} Weights start off random.
    for (let i = 0; i < totalInputs; i++) {
      this.weights[i] = random(-1, 1);
    }
  }

  //{!7} Return an output based on inputs.
  feedforward(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    return this.activate(sum);
  }

  // Output is a +1 or -1.
  activate(sum) {
    if (sum > 0) {
      return 1;
    } else {
      return -1;
    }
  }

  //{!7} Train the network against known data.
  train(inputs, desired) {
    let guess = this.feedforward(inputs);
    let error = desired - guess;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * inputs[i] * this.learningConstant;
    }
  }
}
