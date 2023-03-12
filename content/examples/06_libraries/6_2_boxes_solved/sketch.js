// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;

// A reference to the matter physics engine
let engine;

// An array for all boxe
let boxes = [];

function setup() {
  createCanvas(640, 240);
  // Create the Matter engine
  engine = Engine.create();
}

function draw() {
  background(255);

  // Update the engine!
  Engine.update(engine);

  // Boxes fall from the top every so often
  if (mouseIsPressed) {
    let b = new Box(mouseX, mouseY);
    boxes.push(b);
  }
  
  // Iterate over the boxes backwards
  for (let i = boxes.length-1; i >= 0; i--) {
    boxes[i].show();
    // Remove the Body from the world and the array
    if (boxes[i].checkEdge()) {
      boxes[i].removeBody();
      boxes.splice(i, 1);
    }
  }
}
