// The Nature of Code Exercise 0.3
// solution by Rick Sidwell
// http://natureofcode.com

let walker;

function setup() {
  createCanvas(640, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    const r = random();
    if (r < 0.5) {
      if (r < 0.25) {
        if (this.x < mouseX) {
          this.x++;
        } else {
          this.x--;
        }
      } else {
        if (this.y < mouseY) {
          this.y++;
        } else {
          this.y--;
        }
      }
    } else {
      const choice = floor(random(4));
      if (choice == 0) {
        this.x++;
      } else if (choice == 1) {
        this.x--;
      } else if (choice == 2) {
        this.y++;
      } else {
        this.y--;
      }
    }
  }
}
