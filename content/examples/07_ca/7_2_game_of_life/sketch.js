// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let w = 8;
let columns, rows;
let board;

function setup() {
  createCanvas(640, 240);
  columns = width / w;
  rows = height / w;
  board = create2DArray(columns, rows);
  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      board[i][j] = floor(random(2));
    }
  }
}

function draw() {
  // The next board
  let next = create2DArray(columns, rows);

  //{!2} Looping but skipping the edge cells
  for (let i = 1; i < columns - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      // Add up all the neighbor states to
      // calculate the number of live neighbors.
      let neighbors = 0;
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          neighbors += board[i + k][j + l];
        }
      }
      // Correct by subtracting the cell state itself.
      neighbors -= board[i][j];

      //{!4} The rules of life!
      if (board[i][j] == 1 && neighbors < 2) next[i][j] = 0;
      else if (board[i][j] == 1 && neighbors > 3) next[i][j] = 0;
      else if (board[i][j] == 0 && neighbors == 3) next[i][j] = 1;
      else next[i][j] = board[i][j];
    }
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      //{!1} evaluates to 255 when state is 0 and 0 when state is 1
      fill(255 - board[i][j] * 255);
      stroke(0);
      square(i * w, j * w, w);
    }
  }

  board = next;
}

function create2DArray(columns, rows) {
  let arr = new Array(columns);
  for (let i = 0; i < columns; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}