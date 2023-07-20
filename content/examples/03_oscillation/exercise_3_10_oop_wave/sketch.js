// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Sine Wave

// Two wave objects
let wave0, wave1;

function setup() {
  createCanvas(640, 240);
  // Initialize a wave with starting point, width, amplitude, and period
  wave0 = new Wave(50, 75, 100, 20, 600);
  wave1 = new Wave(300, 120, 300, 40, 180);
}

function draw() {
  background(255);

  // Update and display waves
  wave0.calculate();
  wave0.show();

  wave1.calculate();
  wave1.show();
}
