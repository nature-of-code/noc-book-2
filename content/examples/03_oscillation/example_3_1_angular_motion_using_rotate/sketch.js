// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Position
let angle = 0;
// Velocity
let angleVelocity = 0;
//{!1} Acceleration
let angleAcceleration = 0.0001;

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);

  translate(width / 2, height / 2);
  rotate(angle);

  stroke(0);
  strokeWeight(2);
  fill(127);
  
  line(-60, 0, 60, 0);
  circle(60, 0, 16);
  circle(-60, 0, 16);

  // Angular equivalent of velocity.add(acceleration);
  angleVelocity += angleAcceleration;
  //{!1} Angular equivalent of position.add(velocity);
  angle += angleVelocity;
}