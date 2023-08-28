// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Wave {
  constructor(x, y, w, amplitude, period) {
    // How far apart should each horizontal position be spaced
    this.xspacing = 8;
    // Width of entire wave
    this.w = w;

    // Where does the wave's first point start
    this.origin = createVector(x, y);
    this.theta = 0.0; // Start angle at 0
    this.amplitude = amplitude; // Height of wave

    // How many pixels before the wave repeats
    this.period = period;
    // Value for incrementing X, to be calculated as a function of period and xspacing
    this.dx = (TWO_PI / this.period) * this.xspacing;
    // Using an array to store height values for the wave (not entirely necessary)
    this.yvalues = new Array(floor(this.w / this.xspacing));
  }

  update() {
    // Increment theta (try different values for 'angular velocity' here
    this.theta += 0.02;

    // For every x value, calculate a y value with sine function
    let x = this.theta;
    for (let i = 0; i < this.yvalues.length; i++) {
      this.yvalues[i] = sin(x) * this.amplitude;
      x += this.dx;
    }
  }

  show() {
    // A simple way to draw the wave with an ellipse at each position

    for (let x = 0; x < this.yvalues.length; x++) {
      stroke(0);
      fill(0, 50);
      circle(
        this.origin.x + x * this.xspacing,
        this.origin.y + this.yvalues[x],
        48
      );
    }
  }
}
