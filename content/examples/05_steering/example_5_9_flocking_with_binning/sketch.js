// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Demonstration of Craig Reynolds' "Flocking" behavior
// See: http://www.red3d.com/cwr/
// Rules: Cohesion, Separation, Alignment

// Click mouse to add boids into the system

let flock;

// bin-lattice spatial subdivision
let grid;
let cols;
let rows;
let resolution = 40; // adjust as necessary

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(640, 240);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  grid = make2DArray(cols, rows);
  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 800; i++) {
    let boid = new Boid(random(width), random(height));
    flock.addBoid(boid);
  }
}

function draw() {
  background(255);

  // Reset grid at the beginning of each frame
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = [];
    }
  }

  // Place each boid into the appropriate cell in the grid
  for (let boid of flock.boids) {
    let col = floor(boid.position.x / resolution);
    let row = floor(boid.position.y / resolution);
    col = constrain(col, 0, cols - 1);
    row = constrain(row, 0, rows - 1);
    grid[col][row].push(boid);
  }

  // Draw the grid
  stroke(200);
  strokeWeight(1);

  // Draw vertical lines
  for (let i = 0; i <= cols; i++) {
    let x = i * resolution;
    line(x, 0, x, height);
  }

  // Draw horizontal lines
  for (let j = 0; j <= rows; j++) {
    let y = j * resolution;
    line(0, y, width, y);
  }

  // Highlight the 3x3 neighborhood the mouse is over
  let mouseCol = floor(mouseX / resolution);
  let mouseRow = floor(mouseY / resolution);
  noStroke();
  fill(255, 50, 50, 100); // Semi-transparent red
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = mouseCol + i;
      let row = mouseRow + j;
      // Check if the cell is within the grid
      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        rect(col * resolution, row * resolution, resolution, resolution);
      }
    }
  }

  flock.run();
}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}
