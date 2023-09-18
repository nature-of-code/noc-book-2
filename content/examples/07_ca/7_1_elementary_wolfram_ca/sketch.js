// Array of cells
let cells;
// Starting at generation 0
let generation = 0;
// Cell size
let w = 10;

//{!1} Rule 90
let ruleset = [0, 1, 0, 1, 1, 0, 1, 0];

function setup() {
  createCanvas(640, 240);
  background(255);
  //{!5} An array of 0s and 1s
  cells = new Array(floor(width / w));
  for (let i = 0; i < cells.length; i++) {
    cells[i] = 0;
  }
  cells[floor(cells.length / 2)] = 1;
}

function draw() {
  for (let i = 1; i < cells.length - 1; i++) {
    //{!1} Only drawing the cell's with a state of 1
    if (cells[i] == 1) {
      fill(0);
      //{!1} Set the y-position according to the generation.
      square(i * w, generation * w, w);
    }
  }

  //{!7} Compute the next generation.
  let nextgen = cells.slice();
  for (let i = 1; i < cells.length - 1; i++) {
    let left = cells[i - 1];
    let me = cells[i];
    let right = cells[i + 1];
    nextgen[i] = rules(left, me, right);
  }
  cells = nextgen;

  //{!1} The next generation
  generation++;
  
  // Stopping when it gets to the bottom of the canvas
  if (generation * w > height) {
    noLoop();
  }
  
}

//{!4} Look up a new state from the ruleset.
function rules(a, b, c) {
  let s = "" + a + b + c;
  let index = parseInt(s, 2);
  return ruleset[7 - index];
}
