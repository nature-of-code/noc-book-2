let angleVel = 0.05;
let angle = 0;

function setup() {
  createCanvas(200, 200);
  background(255);

  for (let x = 0; x <= width; x += 24) {
    let y = map(sin(angle), -1, 1, 0, height);
    stroke(0);
    strokeWeight(2);
    fill(127, 127);
    circle(x, y, 48);
    angle += angleVel;
  }
}
