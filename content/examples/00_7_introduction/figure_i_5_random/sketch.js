// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let values = [];

function setup() {
  createCanvas(360,240);
  for (let i = 0; i < width; i++) {
    values[i] = random(height);
  }
}

function draw() {
  background(255);
  noFill();
  stroke(0);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < width; i++) {
    let y = random(height);
    vertex(i,values[(i+frameCount) %values.length]);
  }
  endShape();
}