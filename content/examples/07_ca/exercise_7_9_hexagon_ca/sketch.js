let w, h;
let rows, columns;

let board;

function setup() {
  createCanvas(640, 240);
  //angleMode(DEGREES);
  w = 20;
  h = sin(PI / 3) * w;
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



function drawHexagon(x, y, r) {
  push();
  translate(x, y);
  stroke(0);
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += PI / 3) {
    let xoff = cos(angle) * r;
    let yoff = sin(angle) * r;
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
