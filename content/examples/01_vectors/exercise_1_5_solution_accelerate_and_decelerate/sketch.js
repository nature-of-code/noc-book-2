// The Nature of Code, Exercise 1.5
// Solution by Wendy Dherin
// http://natureofcode.com

let sleeperSize = 5;
let codingTrain;
// Size for the train
let trainW = 64;
let codingTrainImage;

function preload() {
  codingTrainImage = loadImage("images/train.jpg");
}

function setup() {
  createCanvas(640, 240);
  // Place the train at the center to start.
  // The "position" of the image is at the top left corner,
  // which is why we need to subtract half the width
  // and all of the height to get it perfectly centered.
  const startingPosition = createVector(
    width / 2 - trainW / 2,
    height / 2 - trainW - 1 // subtract 1 to place the image just above the railroad
  );
  codingTrain = new CodingTrain(codingTrainImage, startingPosition);
}

function keyPressed() {
  // up and down arrow are handled in the class!
  codingTrain.keyPressed();
}

function draw() {
  background(255);

  // railroad
  fill(0);
  line(0, height / 2, width, height / 2);
  for (let i = 0; i < width - sleeperSize; i += sleeperSize * 3) {
    rect(i, height / 2, sleeperSize, sleeperSize / 2);
  }

  // train
  codingTrain.update();
  codingTrain.show();
}
