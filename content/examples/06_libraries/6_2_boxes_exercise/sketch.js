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
    let box = new Box(mouseX, mouseY);
    boxes.push(box);
  }
  
  // Display all the boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
}