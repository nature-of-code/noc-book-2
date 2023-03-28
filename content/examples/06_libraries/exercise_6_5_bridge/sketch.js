// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

const { Engine, Bodies, Composite, Constraint, Body, Vector }  = Matter;


// A reference to the matter physics engine
let engine;

let bridge;

// An array for all boxes
let boxes = [];

function setup() {
  createCanvas(640, 240);
  // Create the Matter engine
  engine = Engine.create();
  bridge = new Bridge(16);
}

function draw() {
  background(255);

  // Update the engine!
  Engine.update(engine);

  // Boxes fall from the top every so often
  if (random(1) < 0.025) {
    let b = new Box(width / 2, -50);
    boxes.push(b);
  }
  bridge.show();

  // Display all the boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
}

