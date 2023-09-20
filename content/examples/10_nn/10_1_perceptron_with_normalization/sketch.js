// The Perceptron
let perceptron;
//{!1} An array for training data
let training = [];
// A counter to track training data points one by one
let count = 0;

//{!3} The formula for a line
function f(x) {
  return 2 * x + 1;
}

function setup() {
  createCanvas(640, 240);

  // Perceptron has 3 inputs (including bias) and learning rate of 0.01
  perceptron = new Perceptron(3, 0.01);

  //{!1} Make 2,000 training data points.
  for (let i = 0; i < 2000; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    //{!2} Is the correct answer 1 or -1?
    let desired = 1;
    if (y < f(x)) {
      desired = -1;
    }
    training[i] = { inputs: [x, y, 1], output: desired };
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  scale(1, -1);

  stroke(0);
  strokeWeight(2);
  line(-width / 2, f(-width / 2), width / 2, f(width / 2));

  perceptron.train(training[count].inputs, training[count].output);
  //{!1} For animation, we are training one point at a time.
  count = (count + 1) % training.length;

  for (let i = 0; i < count; i++) {
    stroke(0);
    let guess = perceptron.feedforward(training[i].inputs);
    //{!2} Show the classification—no fill for -1, black for +1.
    if (guess > 0) {
      noFill();
    } else {
      fill(0);
    }
    strokeWeight(1);
    circle(training[i].inputs[0], training[i].inputs[1], 8);
  }
}
