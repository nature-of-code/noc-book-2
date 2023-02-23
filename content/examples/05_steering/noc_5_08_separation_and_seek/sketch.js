// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of vehicles
let vehicles = [];

let slider1;
let slider2;
let slider3;

function setup() {

  createCanvas(640, 360);
  // We are now making random vehicles and storing them in an array
  for (let i = 0; i < 50; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }

  slider1 = createSlider(0, 8, 4);
  slider2 = createSlider(0, 8, 4);
  slider3 = createSlider(10, 160, 24);

}

function draw() {
  background(51);

  for (let v of vehicles) {
    v.applyBehaviors(vehicles);
    v.update();
    v.borders();
    v.display();
  }

}