// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// QuadTree
// 1: https://www.youtube.com/watch?v=OJxEcs0w_kE
// 2: https://www.youtube.com/watch?v=QQx_NmCIuCY

// For more:
// https://github.com/CodingTrain/QuadTree

let qtree;

function setup() {
  createCanvas(640, 240);
  let boundary = new Rectangle(width / 2, height / 2, width, height);
  qtree = new QuadTree(boundary, 8);
  for (let i = 0; i < 2000; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x, y);
    qtree.insert(p);
  }
}

function draw() {
  background(255);
  qtree.show();

  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, 50, 50);

  // This check has been introduced due to a bug discussed in https://github.com/CodingTrain/website/pull/556
  if (mouseX < width && mouseY < height) {
    strokeWeight(2);
    stroke(255, 50, 50);
    fill(255, 50, 50, 50);
    rect(range.x, range.y, range.w * 2, range.h * 2);
    let points = qtree.query(range);
    for (let p of points) {
      strokeWeight(3);
      stroke(50, 50, 50);
      point(p.x, p.y);
    }
  }
}
