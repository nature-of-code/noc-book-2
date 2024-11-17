// The Nature of Code, Exercise 0.6
// Solution by Rick Sidwell
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
    let step = 5;
    let xstep = acceptreject() * step;
    if (random([false, true])) {
      xstep *= -1;
    }
    let ystep = acceptreject() * step;
    if (random([false, true])) {
      ystep *= -1;
    }
    this.x += xstep;
    this.y += ystep;
  }
}

// An algorithm for picking a random number based on monte carlo method
// Here probability is determined by formula y = x squared
function acceptreject() {
  // We do this “forever” until we find a qualifying random value.
  while (true) {
    // Pick a random value.
    let r1 = random(1);
    // Assign a probability.
    let probability = r1 * r1;
    // Pick a second random value.
    let r2 = random(1);

    //{!3} Does it qualify?  If so, we’re done!
    if (r2 < probability) {
      return r1;
    }
  }
}