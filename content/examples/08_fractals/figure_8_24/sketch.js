// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let lsystem;
let turtle;

function setup() {
  createCanvas(640, 240);

  let rules = {
    A: "ABA",
    B: "BBB",
  };
  lsystem = new LSystem("A", rules);
  turtle = new Turtle(600);
}

function draw() {
  background(255);
  push();
  translate(20, 20);
  turtle.render(lsystem.sentence);
  print(lsystem.sentence);
  pop();
  
  push();
  lsystem.generate();
  translate(20, 80);
  turtle.length /= 3;
  turtle.render(lsystem.sentence);
  print(lsystem.sentence);
  pop();

  push();
  lsystem.generate();
  translate(20, 140);
  turtle.length /= 3;
  turtle.render(lsystem.sentence);
  print(lsystem.sentence);
  pop();

  
  push();
  lsystem.generate();
  translate(20, 200);
  turtle.length /= 3;
  turtle.render(lsystem.sentence);
  print(lsystem.sentence);
  pop();

  
  
  
  noLoop();
}
