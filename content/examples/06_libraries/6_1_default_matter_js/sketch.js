// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Aliases
const { Engine, Bodies, Composite, Body, Vector, Render } = Matter;

function setup() {
  let canvas = createCanvas(640, 240);
 

  // Make the Engine
  let engine = Engine.create();

  let render = Matter.Render.create({
    canvas: canvas.elt,
    engine,
    options: { width, height },
  });
  Render.run(render);

  // Create the box
  let options = {
    friction: 0.01,
    restitution: 0.75,
  };
  let box = Bodies.rectangle(100, 100, 50, 50, options);
  let v = Vector.create(5, 0);
  Body.setVelocity(box, v);
  Body.setAngularVelocity(box, 0.1);
  Composite.add(engine.world, box);

  // Create a static body for the ground
  let ground = Bodies.rectangle(width / 2, height - 5, width, 10, {
    isStatic: true,
  });
  Composite.add(engine.world, ground);
  
  // create runner
  let runner = Matter.Runner.create();
  // run the engine
  Matter.Runner.run(runner, engine);
}