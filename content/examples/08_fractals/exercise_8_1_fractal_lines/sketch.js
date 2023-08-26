// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);
  drawLines(width / 4, height / 2, (3 * width) / 4, height / 2);
  noLoop();
}

function drawLines(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);

  let dx = x2 - x1;
  let dy = y2 - y1;

  if (dx == 0 && dy > 4) {
    //println(dy);
    drawLines(x1 - dy / 3, y1, x1 + dy / 3, y1);
    drawLines(x1 - dy / 3, y2, x1 + dy / 3, y2);
  } else if (dy == 0 && dx > 4) {
    //println(dx);
    drawLines(x1, y1 - dx / 3, x1, y1 + dx / 3);
    drawLines(x2, y1 - dx / 3, x2, y1 + dx / 3);
  }
}