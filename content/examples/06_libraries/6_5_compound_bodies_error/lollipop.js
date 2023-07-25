// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box

class Lollipop {
  constructor(x, y) {
    this.w = 24;
    this.h = 4;
    this.r = 8;

    this.part1 = Bodies.rectangle(x, y, this.w, this.h);
    this.part2 = Bodies.circle(x + this.w / 2, y, this.r);

    this.body = Body.create({
      restitution: 0.5,
      parts: [this.part1, this.part2],
    });

    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }

  // Drawing the lollipop
  show() {
    if (mouseIsPressed) {
      // The angle comes from the compound body
      let angle = this.body.angle;

      //{!2} Get the position for each part
      let position1 = this.part1.position;
      let position2 = this.part2.position;

      fill(127);
      stroke(0);
      strokeWeight(1);

      // Translate and rotate the rectangle (part1)
      push();
      translate(position1.x, position1.y);
      rotate(angle);
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
      pop();

      // Translate and rotate the circle (part2)
      push();
      translate(position2.x, position2.y);
      rotate(angle);
      fill(200);
      circle(0, 0, this.r * 2);
      pop();
    } else {
      let position = this.body.position;
      let angle = this.body.angle;
      rectMode(CENTER);
      fill(127);
      stroke(0);
      strokeWeight(1);
      push();
      translate(position.x, position.y);
      rotate(angle);
      rect(0, 0, this.w, this.h);
      fill(200);
      circle(this.w / 2, 0, this.r * 2);
      pop();
    }
  }

  checkEdge() {
    return this.body.position.y > height + this.h * 2;
  }

  // This function removes a body from the Matter.js world.
  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}
