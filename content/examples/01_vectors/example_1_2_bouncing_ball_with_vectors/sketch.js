// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Example 1-2: Bouncing Ball, with p5.Vector!
//{!2 .bold} Instead of a bunch of floats, we now just have two variables.
let position;
let velocity;

function setup() {
  createCanvas(640, 240);
  //{!2 .bold} Note how createVector() has to be called inside of setup().
  position = createVector(100, 100);
  velocity = createVector(2.5, 2);
}

function draw() {
  background(255);
  //{!1 .bold .no-comment}
  position.add(velocity);

  //{!6 .bold .code-wide} We still sometimes need to refer to the individual components of a p5.Vector and can do so using the dot syntax: position.x, velocity.y, etc.
  if (position.x > width || position.x < 0) {
    velocity.x = velocity.x * -1;
  }
  if (position.y > height || position.y < 0) {
    velocity.y = velocity.y * -1;
  }

  stroke(0);
  fill(127);
  strokeWeight(2);
  circle(position.x, position.y, 48);
}
