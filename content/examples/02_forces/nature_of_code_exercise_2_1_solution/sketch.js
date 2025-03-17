let balloon;

function setup() {
  createCanvas(640, 240);

  balloon = new Balloon(width, height);
}

function draw() {
  background(255);
  balloon.update();
  balloon.show();
}
