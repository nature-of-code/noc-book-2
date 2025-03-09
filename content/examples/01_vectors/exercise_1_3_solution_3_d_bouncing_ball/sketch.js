// The Nature of Code, Exercise 1.3
// Solution by Wendy Dherin
// http://natureofcode.com

let font;
let boxSize;
let ball;

function preload() {
  font = loadFont("./Poppins-SemiBoldItalic.ttf");
}

function mousePressed() {
  save("screenshot.png");
}

function setup() {
  createCanvas(640, 240, WEBGL);
  boxSize = width / 4;
  ball = new Ball(width, height, boxSize);
  textFont(font);
}

function draw() {
  background(255);
  // orbitControl allows the user to manipulate the box;
  // see https://p5js.org/reference/p5/orbitControl/
  orbitControl();
  noFill();
  rotateY(PI / 3);
  rotateX(PI / 1.5);
  box(boxSize);
  ball.update();
  ball.checkEdges();
  ball.show();

  // Print text instructions to the canvas
  resetMatrix();
  textAlign(LEFT, TOP);
  fill(0);
  text(
    "Use the mouse to drag the box into different positions.",
    -width / 2 + 10,
    -height / 2 + 10
  );
}
