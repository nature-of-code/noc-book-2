// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Chapter 3: Asteroids exercise

// Mover object
let ship;

function setup() {
  createCanvas(640, 240);
  ship = new Spaceship();
}

function draw() {
  background(255);

  // Update position
  ship.update();
  // Wrape edges
  ship.wrapEdges();
  // Draw ship
  ship.display();


  fill(0);
  noStroke();
  text("left right arrows to turn, z to thrust",10,height-5);
  
  // Turn or thrust the ship depending on what key is pressed
  if (keyIsDown(LEFT_ARROW)) {
    ship.turn(-0.03);
  } else if (keyIsDown(RIGHT_ARROW)) {
    ship.turn(0.03);
  } else if (keyIsDown(UP_ARROW)) {
    ship.thrust();
  }

}