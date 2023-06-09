// Nature of Code
// Daniel Shiffman
// Chapter 3: Oscillation

// Object to describe an anchor point that can connect to "Bob" objects via a spring
// Thank you: http://www.myphysicslab.com/spring2d.html

class Spring {
  constructor(x, y, length) {
    this.anchor = createVector(x, y);
    this.restLength = length;
    this.k = 0.2;
  }
  // Calculate and apply spring force
  connect(bob) {
    // Vector pointing from anchor to bob location
    let force = p5.Vector.sub(bob.position, this.anchor);
    // What is distance
    let currentLength = force.mag();
    // Stretch is difference between current distance and rest length
    let stretch = currentLength - this.restLength;

    //{!2 .bold} Direction and magnitude together!
    force.setMag(-1 * this.k * stretch);

    //{!1} Call applyForce() right here!
    bob.applyForce(force);
  }

  constrainLength(bob, minlen, maxlen) {
    //{!1} Vector pointing from Bob to Anchor
    let direction = p5.Vector.sub(bob.position, this.anchor);
    let length = direction.mag();

    //{!1} Is it too short?
    if (length < minlen) {
      direction.setMag(minlen);
      //{!1} Keep position within constraint.
      bob.position = p5.Vector.add(this.anchor, direction);
      bob.velocity.mult(0);
      //{!1} Is it too long?
    } else if (length > maxlen) {
      direction.setMag(maxlen);
      //{!1} Keep position within constraint.
      bob.position = p5.Vector.add(this.anchor, direction);
      bob.velocity.mult(0);
    }
  }

  //{!5} Draw the anchor.
  show() {
    fill(127);
    circle(this.anchor.x, this.anchor.y, 10);
  }

  //{!4} Draw the spring connection between Bob position and anchor.
  showLine(bob) {
    stroke(0);
    line(bob.position.x, bob.position.y, this.anchor.x, this.anchor.y);
  }
}
