class CodingTrain {
  constructor(image, startingPosition) {
    this.image = image;
    this.position = startingPosition;
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(0, 0);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(25);
    if (this.velocity.x <= 0) {
      this.velocity.x = 0;
      this.acceleration.x = 0;
    }

    // handle the case where the train goes
    // offscreen by making it reappear on the
    // other side
    if (this.position.x > width) {
      this.position.x = -this.image.width;
    }
    if (this.position.x < 0 - this.image.width) {
      this.position.x = width;
    }
  }

  show() {
    image(this.image, this.position.x, this.position.y);
  }

  keyPressed() {
    if (keyCode === UP_ARROW) {
      this.acceleration.x += 0.1;
    }
    if (keyCode === DOWN_ARROW) {
      this.acceleration.x -= 0.1;
    }
  }
}
