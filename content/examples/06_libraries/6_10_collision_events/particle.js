class Particle {
  constructor(x, y) {
    this.radius = random(4, 8);
    this.col = color(127);

    let options = {
      restitution: 0.6,
    };
    this.body = Bodies.circle(x, y, this.radius, options);

    this.body.plugin.particle = this;

    Composite.add(engine.world, this.body);
  }

  // Change color when hit
  change() {
    this.col = color(random(100, 255), 0, random(100, 255));
  }
  
  
  checkEdge() {
    return this.body.position.y > height + this.radius;
  }
  
    // This function removes a body from the Matter.js world.
  removeBody() {
    Composite.remove(engine.world, this.body);
  }


  // Drawing the box
  show() {
    rectMode(CENTER);
    fill(this.col);
    stroke(0);
    strokeWeight(2);
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    circle(0, 0, this.radius * 2);
    line(0, 0, this.radius, 0);
    pop();
  }
}
