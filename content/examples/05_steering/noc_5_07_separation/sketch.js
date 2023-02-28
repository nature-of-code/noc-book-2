// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Separation
// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of vehicles
let vehicles = [];

function setup() {
  let text = createP("Drag the mouse to generate new vehicles.");

  createCanvas(640, 240);
  // We are now making random vehicles and storing them in an array
  for (let i = 0; i < 25; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(255);


  for (let v of vehicles) {
    v.separate(vehicles);
    v.update();
    v.borders();
    v.display();
  }

}


function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}