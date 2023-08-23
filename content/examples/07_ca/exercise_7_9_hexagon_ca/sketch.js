let w, h;
let rows, columns;

let board;

function setup() {
  createCanvas(640, 240);
  angleMode(DEGREES);
  w = 20;
  h = sin(60) * w;
  columns = floor((width / w) * 3);
  rows = floor(height / h) + 2;
  board = create2DArray(columns, rows);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(220);

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w * 3;
      let y = j * h;
      if (j % 2 == 0) {
        x += 1.5 * w;
      }
      fill(255 - board[i][j] * 255);
      drawHexagon(x, y, w);
    }
  }
}

function drawHexagon(x, y, w) {
  push();
  translate(x, y);
  stroke(0);
  beginShape();
  for (let i = 0; i < 360; i += 60) {
    let xoff = cos(i) * w;
    let yoff = sin(i) * w;
    vertex(xoff, yoff);
  }
  endShape(CLOSE);
  pop();
}

function create2DArray(rows, columns) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}
