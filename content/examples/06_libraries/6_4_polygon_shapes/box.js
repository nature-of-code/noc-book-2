// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box

class CustomShape {
  constructor(x, y) {
    let vertices = [];
    vertices[4] = Vector.create(-15, 25);
    vertices[3] = Vector.create(-5, 20);
    vertices[2] = Vector.create(15, 0);
    vertices[1] = Vector.create(20, -15);
    vertices[0] = Vector.create(-10, -10);
    
    let options = { restitution: 1 };
    this.body = Bodies.fromVertices(x, y, vertices, options);
    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }

  // Drawing the box
  show() {
    fill(127);
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let v of this.body.vertices) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);    
  }
}
