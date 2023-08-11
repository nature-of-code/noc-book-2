let bird;
let pipes = [];

function setup() {
  createCanvas(640, 240);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(255);

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].collides(bird)) {
      text("OOPS!", pipes[i].x, pipes[i].top + 20);
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == " ") {
    bird.flap();
  }
}
