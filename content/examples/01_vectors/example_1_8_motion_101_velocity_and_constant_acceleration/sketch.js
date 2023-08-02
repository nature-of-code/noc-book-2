// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let mover;
let counter=0;

function setup() {
  createCanvas(640, 240);
  mover = new Mover();
}

function draw() {
  mover.update();
  mover.checkEdges();
  
  counter++;
  if(counter%3===0){
    drawGraphic()
  }
}

function drawGraphic(){
  background(255,30);
  mover.show();
  
}

function mousePressed(){
  save('screenshot.png')
}
