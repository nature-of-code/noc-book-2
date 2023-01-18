// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box

class Box {
  constructor(x, y) {
    this.w = 16;
    this.body = Bodies.rectangle(x, y, this.w, this.w);
    Composite.add(engine.world, this.body);
  }
  
  // Drawing the box
  show() {
    let pos = this.body.position;
    let a = this.body.angle;
    
    
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);    
    push();
    translate(pos.x, pos.y);
    rotate(a);
    square(0, 0, this.w);
    pop();
  }
}
