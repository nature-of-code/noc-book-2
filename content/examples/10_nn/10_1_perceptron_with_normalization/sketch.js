// The Perceptron
let perceptron;
//{!1} An array for training data
let training = [];
// A counter to track training data points one by one
let count = 0;

//{!3} The formula for a line
function f(x) {
  return 0.5 * x + 1;
}

function setup() {
  createCanvas(640, 240);

  // Perceptron has 3 inputs (including bias) and learning rate of 0.01
  perceptron = new Perceptron(3, 0.0001);

  //{!1} Make 2,000 training data points.
  for (let i = 0; i < 2000; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    training[i] = [x, y, 1];
  }
}

function draw() {
  background(255);
  // Re-orient canvas to match traditional Cartesian plane
  translate(width / 2, height / 2);
  scale(1, -1);

  // Draw the line
  stroke(0);
  strokeWeight(2);
  line(-width / 2, f(-width / 2), width / 2, f(width / 2));
  
  // Get the current (x,y) of the training data
  let x = training[count][0];
  let y = training[count][1];
  // What is the desired output?
  let desired = -1;
  if (y > f(x)) {
    desired = 1;
  }
  // Train the perceptron
  perceptron.train(training[count], desired);

  //For animation, training one point at a time.
  count = (count + 1) % training.length;

  // Draw all the points and color according to the output of the perceptron
  for (let dataPoint of training) {
    let guess = perceptron.feedforward(dataPoint);
    if (guess > 0) {
      fill(127);
    } else {
      fill(255);
    }
    strokeWeight(1);
    stroke(0);
    circle(dataPoint[0], dataPoint[1], 8);
  }
}