// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Seeking "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/

let v;

function setup() {
  createCanvas(640, 240);
  v = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(255);

  let mouse = createVector(mouseX, mouseY);

  // Draw an ellipse at the mouse position
  fill(0);
  stroke(100);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  // Call the appropriate steering behaviors for our agents
  v.seek(mouse);
  v.update();
  v.display();

}