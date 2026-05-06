// The Nature of Code
// Solution by Rick Sidwell
// http://natureofcode.com

// This sketch extends Example 8.9 from The Nature of Code by adding 3D rotations.
// Besides + and - to turn right and left, it can use ^ and & to pitch up and down,
// and < and > to roll left and right.

// No change to lsystem.js, the new commands are added to turtle.js, and the
// sketch is changed to use WEBGL and 3D L-System examples.

let lsystem;
let turtle;

let rotation = 0;

function setup() {
  createCanvas(640, 240, WEBGL);
  
  // Example from https://github.com/abiusx/L3D/blob/master/L/seaweed.l3d
  let rules = {
    F: "FF-[&F^F^F]+[^F&F&F]>",
  };
  lsystem = new LSystem("F", rules);
  turtle = new Turtle(3, radians(22));

  // Example from https://github.com/abiusx/L3D/blob/master/L/creative.l3d
  // let rules = {
  //   F: "[-&>G][>++&G]||F[--&<G][+&G]FF-[-F+F+F]-[^>F-F-F&<]",
  //   G: "F[+G][-G]F[+G][-G]FG"
  // };
  // lsystem = new LSystem("F", rules);
  // turtle = new Turtle(8, radians(15));  
  
  // More 3D examples
  
  // let rules = {
  //   X: "XS+XS-XS-XSXS+XS+XS-X",
  //   S: "F^F^F^F^F"
  // };
  // lsystem = new LSystem("&-XS-XS-XS-XS", rules);
  // turtle = new Turtle(7, PI/2);

  // let rules = {
  //   X: "^<XF^<XFX-F^>>XFX&F+>>XFX-F>X->",
  // };
  // lsystem = new LSystem("X", rules);
  // turtle = new Turtle(8, radians(90));

  for (let i = 0; i < 4; i++) {
    lsystem.generate();
  }
}

function draw() {
  background(255);
  translate(0, 100);
  rotateX(radians(-25));
  rotateY(rotation);
  turtle.render(lsystem.sentence);
  rotation += 0.05;
}