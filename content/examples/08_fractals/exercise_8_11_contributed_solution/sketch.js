// The Nature of Code, Exercise 8.11
// Solution by Rick Sidwell
// http://natureofcode.com

let lsystem;
let turtle;
let segments;

function setup() {
  createCanvas(640, 240);

  let rules = {
    F: "FF+[+F-F-F]-[-F+F+F]",
  };
  lsystem = new LSystem("F", rules);
  turtle = new Turtle(4, radians(25));

  for (let i = 0; i < 4; i++) {
    lsystem.generate();
  }

  // Some other rules
  // let ruleset = {
  //   F: "F[F]-F+F[--F]+F-F",
  // };
  // lsystem = new LSystem("F-F-F-F", ruleset);
  // turtle = new Turtle(4, PI / 2);

  // let ruleset = {
  //   F: "F--F--F--G",
  //   G: "GG",
  // };
  // lsystem = new LSystem("F--F--F", ruleset);
  // turtle = new Turtle(8, PI / 3);

  segments = turtle.toSegments(lsystem.sentence);
}

function draw() {
  background(255);
  translate(width / 2, height);
  stroke(0);
  for (let segment of segments) {
    segment.show();
  }
  noLoop();
}
