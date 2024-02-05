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
      board[i][j] = new Cell(floor(random(2)), i * w, j * w, w);
    }
  }
}

function draw() {
  //{!2} Looping but skipping the edge cells
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      let neighborSum = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          //{!1 .bold} Use the previous state when counting neighbors
          neighborSum += board[x + i][y + j].previous;
        }
      }
      neighborSum -= board[x][y].previous;

      //{!3} Set the cell's new state based on the neighbor count
      if (board[x][y].state == 1 && neighborSum < 2) {
        board[x][y].state = 0;
      } else if (board[x][y].state == 1 && neighborSum > 3) {
        board[x][y].state = 0;
      } else if (board[x][y].state == 0 && neighborSum == 3) {
        board[x][y].state = 1;
      }
      // else do nothing!
    }
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      //{!1} evaluates to 255 when state is 0 and 0 when state is 1
      board[i][j].show();
      
      //{!1} save the previous state before the next generation!
      board[i][j].previous = board[i][j].state;
    }
  }
}

function create2DArray(columns, rows) {
  let arr = new Array(columns);
  for (let i = 0; i < columns; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = new Cell(0, i * w, j * w, w);
    }
  }
  return arr;
}
