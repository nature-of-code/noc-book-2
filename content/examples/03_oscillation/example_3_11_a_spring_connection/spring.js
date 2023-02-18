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
    let d = force.mag();
    // Stretch is difference between current distance and rest length
    let stretch = d - this.restLength;

    // Calculate force according to Hooke's Law
    // F = k * stretch
    force.normalize();
    force.mult(-1 * this.k * stretch);
    bob.applyForce(force);
  }

  // Constrain the distance between bob and anchor between min and max
  constrainLength(b, minLength, maxLength) {
    let dir = p5.Vector.sub(b.position, this.anchor);
    let d = dir.mag();
    // Is it too short?
    if (d < minLength) {
      dir.normalize();
      dir.mult(minLength);
      // Reset location and stop from moving (not realistic physics)
      b.position = p5.Vector.add(this.anchor, dir);
      b.velocity.mult(0);
      // Is it too long?
    } else if (d > maxLength) {
      dir.normalize();
      dir.mult(maxLength);
      // Reset location and stop from moving (not realistic physics)
      b.position = p5.Vector.add(this.anchor, dir);
      b.velocity.mult(0);
    }
  }

  // Constrain the distance between bob and anchor between min and max
  constrainLength(bob, minlen, maxlen) {
    let dir = p5.Vector.sub(bob.position, this.anchor);
    let d = dir.mag();
    // Is it too short?
    if (d < minlen) {
      dir.normalize();
      dir.mult(minlen);
      // Reset position and stop from moving (not realistic physics)
      bob.position = p5.Vector.add(anchor, dir);
      bob.velocity.mult(0);
      // Is it too long?
    } else if (d > maxlen) {
      dir.normalize();
      dir.mult(maxlen);
      // Reset position and stop from moving (not realistic physics)
      bob.position = p5.Vector.add(this.anchor, dir);
      bob.velocity.mult(0);
    }
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.anchor.x, this.anchor.y, 10);
  }

  showLine(b) {
    stroke(0);
    strokeWeight(2);
    line(b.position.x, b.position.y, this.anchor.x, this.anchor.y);
  }
}
