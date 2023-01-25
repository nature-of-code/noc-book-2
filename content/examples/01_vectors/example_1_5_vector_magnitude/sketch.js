// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Example 1-5: Vector magnitude

function setup() {
  createCanvas(640,240);
}

function draw() {
  background(255);

  let mouse = createVector(mouseX,mouseY);
  let center = createVector(width/2,height/2);
  mouse.sub(center);

  let m = mouse.mag();
  fill(127);
  stroke(0);
  strokeWeight(2);
  rect(0,0,m,10);

  translate(width/2,height/2);
  line(0,0,mouse.x,mouse.y);
}
