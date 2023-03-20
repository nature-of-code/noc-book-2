// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

const { Engine, Bodies, Composite, Constraint, Vector, Mouse, MouseConstraint } = Matter;

// A reference to the matter physics engine
let engine;

let boundaries = [];

let box1, box2;

let mouse, mouseConstraint;

function setup() {
  let canvas = createCanvas(640, 240);
  pixelDensity(1);
  // Create the Matter engine
  engine = Engine.create();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(width / 2, height - 5, width, 10));
  boundaries.push(new Boundary(width / 2, 5, width, 10));
  boundaries.push(new Boundary(5, height / 2, 10, height));
  boundaries.push(new Boundary(width - 5, height / 2, 10, height));

  box1 = new Box(300, height / 2, 48, 48);
  box2 = new Box(400, height / 2, 48, 48);

  mouse = Mouse.create(canvas.elt);
  let options = {
    mouse: mouse,
    constraint: {
      stiffness: 0.7,
    },
  };
  mouseConstraint = MouseConstraint.create(engine, options);
  Composite.add(engine.world, mouseConstraint);
}

function draw() {
  background(255);

  // Update the engine!
  Engine.update(engine);

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }

  box1.show();
  box2.show();
}
