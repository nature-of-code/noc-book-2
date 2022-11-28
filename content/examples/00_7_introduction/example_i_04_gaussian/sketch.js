// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function setup() {
  createCanvas(640, 240);
  background(255);
}

function draw() {
  // Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
  let xloc = randomGaussian();

  const sd = 60; // Define a standard deviation
  const mean = width / 2; // Define a mean value (middle of the screen along the x-axis)
  xloc = xloc * sd + mean; // Scale the gaussian random number by standard deviation and mean

  fill(0, 10);
  noStroke();
  ellipse(xloc, height / 2, 16, 16); // Draw an ellipse at our "normal" random position
}
