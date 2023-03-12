// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Body = Matter.Body;
const Vector = Matter.Vector;

// A reference to the matter physics engine
let engine;

// An array for all boxes
let boxes = [];

// An array for all boundaries
let boundaries = [];

function setup() {
  createCanvas(640, 240);
  // Create the Matter engine
  engine = Engine.create();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(width / 4, height - 5, width / 2 - 50, 10));
  boundaries.push(
    new Boundary((3 * width) / 4, height - 50, width / 2 - 50, 10)
  );
}

function draw() {
  background(255);

  // Update the engine!
  Engine.update(engine);

  // Boxes fall from the top every so often
  if (random(1) < 0.1) {
    let b = new Box(width / 2, 50);
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
  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}
