let startAngle = 0;
let angleVel = 0.23;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(51);

  startAngle += 0.015;
  let angle = startAngle;

  for (let x = 0; x <= width; x += 24) {
    let y = map(sin(angle), -1, 1, 0, height);
    stroke(164);
    fill(255, 50);
    strokeWeight(2);
    ellipse(x, y, 48, 48);
    angle += angleVel;
  }
}