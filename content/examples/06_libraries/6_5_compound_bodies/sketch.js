// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// TODO: Why is body.pos different from part1.pos?
// Why is there body.angle but no part1.angle?

const { Engine, Bodies, Composite, Body, Vector }  = Matter;


// A reference to the matter physics engine
let engine;

// An array for all boxes
let lollipops = [];

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
  if (random(1) < 0.025) {
    let lollipop = new Lollipop(width / 2, 50);
    lollipops.push(lollipop);
  }

  // Iterate over the boxes backwards
  for (let i = lollipops.length - 1; i >= 0; i--) {
    lollipops[i].show();
    // Remove the Body from the world and the array
    if (lollipops[i].checkEdge()) {
      lollipops[i].removeBody();
      lollipops.splice(i, 1);
    }
  }
  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}
