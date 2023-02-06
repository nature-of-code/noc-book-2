// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Example 1-5: Vector magnitude

function setup() {
  createCanvas(640, 240);
}

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);

  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);
  mouse.sub(center);

  //{!3} The magnitude (i.e. length) of a vector can be accessed via the mag() function.  Here it is used as the width of a rectangle drawn at the top of the window.
  const m = mouse.mag();
  fill(0);
  rect(10, 10, m, 10);

  translate(width / 2, height / 2);
  line(0, 0, mouse.x, mouse.y);
}
