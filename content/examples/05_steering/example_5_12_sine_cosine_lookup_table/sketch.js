/*
sincoslookup taken from http://wiki.processing.org/index.php/Sin/Cos_look-up_table
archived version http://web.archive.org/web/20130510100827/http://wiki.processing.org/w/Sin/Cos_look-up_table
ported to p5.js by Miká Kruschel
https://editor.p5js.org/mikakruschel/sketches/Ag6QMqDE
*/

// declare arrays and params for storing sin/cos values
let sinLUT;
let cosLUT;
// set table precision to 0.5 degrees
const SC_PRECISION = 0.5;
// caculate reciprocal for conversions
const SC_INV_PREC = 1 / SC_PRECISION;
// compute required table length
const SC_PERIOD = Math.floor(360 * SC_INV_PREC);

// init sin/cos tables with values
// should be called from setup()
function initSinCos() {
  sinLUT = [];
  cosLUT = [];
  for (let i = 0; i < SC_PERIOD; i++) {
    sinLUT[i] = sin(i * DEG_TO_RAD * SC_PRECISION);
    cosLUT[i] = cos(i * DEG_TO_RAD * SC_PRECISION);
  }
}

// circle radius used for example
let radius;

function setup() {
  createCanvas(640, 240);
  initSinCos(); // important call to initialize lookup tables
}

function draw() {
  background(255);
  // modulate the current radius
  radius = 50 + 50 * sinLUT[frameCount % SC_PERIOD];

  // draw a circle made of points (every 5 degrees)
  for (let i = 0; i < 360; i += 5) {
    // convert degrees into array index:
    // the modulo operator (%) ensures periodicity
    let theta = int((i * SC_INV_PREC) % SC_PERIOD);
    strokeWeight(4);
    // draw the circle around mouse pos
    point(
      width / 2 + radius * cosLUT[theta],
      height / 2 + radius * sinLUT[theta]
    );
  }
}
