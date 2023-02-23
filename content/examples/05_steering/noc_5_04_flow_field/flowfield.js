// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following

class FlowField {

  constructor(r) {
    this.resolution = r;
    //{!2} Determine the number of columns and rows.
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;
    //{!1} A flow field is a two-dimensional array of vectors. The example includes as separate function to create that array
    this.field = make2Darray(this.cols, this.rows);
    console.log(this.field);
    this.init();
  }

  // The init() function to fill our 2D array
  init() {
    // Reseed noise for a new flow field every time
    noiseSeed(random(10000));
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        //{.code-wide} In this example, use Perlin noise to create the vectors.
        let angle = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        this.field[i][j] = p5.Vector.fromAngle(angle);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  // Draw every vector
  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
      }
    }
  }

  //{.code-wide} A function to return a p5.Vector based on a position
  lookup(lookup) {
    let column = constrain(floor(lookup.x / this.resolution), 0, this.cols - 1);
    let row = constrain(floor(lookup.y / this.resolution), 0, this.rows - 1);
    return this.field[column][row].copy();
  }

}


// Helper function to make a 2D array
function make2Darray(cols, rows) {
  console.log(cols, rows);
  let array = new Array(cols);
  for (let i = 0; i < cols; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

// Renders a vector 'v' as an arrow at a location 'x,y'
function drawVector(v, x, y, scayl) {
  push();
  let arrowsize = 4;
  // Translate to location to render vector
  translate(x, y);
  stroke(200, 100);
  // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
  rotate(v.heading());
  // Calculate length of vector & scale it to be bigger or smaller if necessary
  let len = v.mag() * scayl;
  // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
  line(0, 0, len, 0);
  //line(len,0,len-arrowsize,+arrowsize/2);
  //line(len,0,len-arrowsize,-arrowsize/2);
  pop();
}