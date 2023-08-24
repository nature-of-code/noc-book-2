// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let lsystem;
let turtle;

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
}

function draw() {
  background(255);
  translate(width / 2, height);
  turtle.render(lsystem.sentence);
  noLoop();
}