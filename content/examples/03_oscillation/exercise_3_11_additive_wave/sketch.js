// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Additive Wave
// Create a more complex wave by adding two waves together.

// Maybe better for this answer to be OOP???

let xspacing = 8; // How far apart should each horizontal position be spaced
let w; // Width of entire wave
let maxwaves = 5; // total # of waves to add together

let theta = 0.0;
let amplitude = []; // Height of wave
let dx = []; // Value for incrementing X, to be calculated as a function of period and xspacing
let yvalues; // Using an array to store height values for the wave (not entirely necessary)

function setup() {
  createCanvas(640, 240);
  w = width + 16;

  for (let i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 30);
    let period = random(100, 300); // How many pixels before the wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }

  yvalues = [];
}

function draw() {
  background(255);
  calcWave();
  renderWave();
}

function calcWave() {
  // Increment theta (try different values for 'angular velocity' here
  theta += 0.02;

  // Set all height values to zero
  for (let i = 0; i < w / xspacing; i++) {
    yvalues[i] = 0;
  }

  // Accumulate wave height values
  for (let j = 0; j < maxwaves; j++) {
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      // Every other wave is cosine instead of sine
      if (j % 2 === 0) yvalues[i] += sin(x) * amplitude[j];
      else yvalues[i] += cos(x) * amplitude[j];
      x += dx[j];
    }
  }
}

function renderWave() {
  // A simple way to draw the wave with an ellipse at each position
  stroke(0);
  fill(0, 100);
  ellipseMode(CENTER);
  for (let x = 0; x < yvalues.length; x++) {
    circle(x * xspacing, height / 2 + yvalues[x], 32);
  }
}
