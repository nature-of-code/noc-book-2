// Step 1: load data or create some data
let data = [
  { x: 0.99, y: 0.02, label: "right" },
  { x: 0.76, y: -0.1, label: "right" },
  { x: -1.0, y: 0.12, label: "left" },
  { x: -0.9, y: -0.1, label: "left" },
  { x: 0.02, y: 0.98, label: "down" },
  { x: -0.2, y: 0.75, label: "down" },
  { x: 0.01, y: -0.9, label: "up" },
  { x: -0.1, y: -0.8, label: "up" },
];
let classifer;
let status = "training";

let start, end;

function setup() {
  createCanvas(640, 240);
  // Step 2: set your neural network options
  let options = {
    task: "classification",
    debug: true,
  };

  // Step 3: initialize your neural network
  classifier = ml5.neuralNetwork(options);

  // Step 4: add data to the neural network
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let inputs = [item.x, item.y];
    let outputs = [item.label];
    classifier.addData(inputs, outputs);
  }

  // Step 5: normalize your data;
  classifier.normalizeData();

  // Step 6: train your neural network
  classifier.train({ epochs: 200 }, finishedTraining);
}
// Step 7: use the trained model
function finishedTraining() {
  status = "ready";
}

// Step 8: make a classification

function draw() {
  background(255);
  textAlign(CENTER, CENTER);
  textSize(64);
  text(status, width / 2, height / 2);
  if (start && end) {
    strokeWeight(8);
    line(start.x, start.y, end.x, end.y);
  }
}

function mousePressed() {
  start = createVector(mouseX, mouseY);
}

function mouseDragged() {
  end = createVector(mouseX, mouseY);
}

function mouseReleased() {
  let dir = p5.Vector.sub(end, start);
  dir.normalize();
  let inputs = [dir.x, dir.y];
  console.log(inputs);
  classifier.classify(inputs, gotResults);
}

// Step 9: define a function to handle the results of your classification
function gotResults(error, results) {
  status = results[0].label;
  console.log(JSON.stringify(results,null,2));
}
