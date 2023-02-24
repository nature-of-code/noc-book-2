// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smoke Particle System

// A basic smoke effect using a particle system
// Each particle is rendered as an alpha masked image


let ps;
let img;

function preload() {
  img = loadImage("data/texture.png");
}

function setup() {

  createCanvas(640, 240, WEBGL);
  ps = new ParticleSystem(0, 75, img);

}

function draw() {

  // Access WEBGL Directly for more blending options?
  // var gl = this._renderer.GL;
  // gl.enable(gl.BLEND);
  // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  background(0);
  // Additive blending!
  blendMode(ADD);

  // Calculate a "wind" force based on mouse horizontal position
  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);
  ps.applyForce(wind);
  ps.run();
  for (let i = 0; i < 2; i++) {
    ps.addParticle();
  }

  // Draw an arrow representing the wind force
  drawVector(wind, createVector(0, -50, 0), 500);

}

// Renders a vector object 'v' as an arrow and a position 'loc'
function drawVector(v, pos, scayl) {
  push();
  let arrowsize = 4;
  // Translate to position to render vector
  translate(pos.x, pos.y);
  stroke(255);
  fill(255);
  strokeWeight(1);
  // Call vector heading function to get direction (note that pointing up is a heading of 0) and rotate
  rotate(v.heading());
  // Calculate length of vector & scale it to be bigger or smaller if necessary
  let len = v.mag() * scayl;
  // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
  line(0, 0, len, 0);
  line(len, 0, len - arrowsize, +arrowsize / 2);
  line(len, 0, len - arrowsize, -arrowsize / 2);
  pop();
}