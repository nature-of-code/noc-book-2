// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// An array for all of our boxes
let boxes = [];

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);

  // Boxes fall from the top every so often
  if (mouseIsPressed) {
    let boxx = new Box(mouseX, mouseY);
    boxes.push(boxx);
  }

  //{!3} Display all the Box objects.
  for (let boxx of boxes) {
    boxx.show();
  }
}
