// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

const heights = [];
let sd = 0.4;

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);
  const e = 2.71828183; //"e", see http://mathforum.org/dr.math/faq/faq.e.html for more info
  let m = 0; //default mean of 0
  for (let i = 0; i < width; i++) {
    let xcoord = map(i, 0, width, -3, 3);
    let sq2pi = sqrt(2 * PI); //square root of 2 * PI
    let xmsq = -1 * (xcoord - m) * (xcoord - m); //-(x - mu)^2
    let sdsq = sd * sd; //variance (standard deviation squared)
    heights[i] = (1 / (sd * sq2pi)) * pow(e, xmsq / sdsq); //P(x) function
  }
  
  sd += 0.01;
  if (sd > 2) sd = 0.4;

  // a little for loop that draws a line between each point on the graph
  stroke(0);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < heights.length - 1; i++) {
    let x = i;
    let y = map(heights[i], 0, 1, height - 2, 2);
    vertex(x, y);
  }
  endShape();
}
