// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// An array to keep track of how often random numbers are picked
let randomCounts = [];

function setup() {
  createCanvas(640, 240);
  for (let i = 0; i < 20; i++) {
    randomCounts[i] = 0;
  }
}

function draw() {
  background(255);

  // Pick a random number and increase the count
  let index = int(acceptreject() * randomCounts.length);
  randomCounts[index]++;

  // Draw a rectangle to graph results
  stroke(0);
  strokeWeight(2);
  fill(127);

  let w = width / randomCounts.length;

  for (let x = 0; x < randomCounts.length; x++) {
    rect(x * w, height - randomCounts[x], w - 1, randomCounts[x]);
  }
}

// An algorithm for picking a random number based on monte carlo method
// Here probability is determined by formula y = x
function acceptreject() {
  // We do this “forever” until we find a qualifying random value.
  while (true) {
    // Pick a random value.
    let r1 = random(1);
    // Assign a probability.
    let probability = r1;
    // Pick a second random value.
    let r2 = random(1);

    //{!3} Does it qualify?  If so, we’re done!
    if (r2 < probability) {
      return r1;
    }
  }
}