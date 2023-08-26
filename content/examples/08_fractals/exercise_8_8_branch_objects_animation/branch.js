class Branch {
  constructor(startPos, velocity, timerStart) {
    this.start = startPos.copy();
    this.end = startPos.copy();
    this.vel = velocity.copy();
    this.timerStart = timerStart;
    this.timer = this.timerStart;
    this.growing = true;
  }

  update() {
    if (this.growing) {
      this.end.add(this.vel);
    }
  }

  show() {
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  timeToBranch() {
    this.timer--;
    if (this.timer < 0 && this.growing) {
      this.growing = false;
      return true;
    } else {
      return false;
    }
  }

  branch(angle) {
    let theta = this.vel.heading();
    let mag = this.vel.mag();
    theta += radians(angle);
    let newVel = p5.Vector.fromAngle(theta);
    newVel.setMag(mag);
    return new Branch(this.end, newVel, this.timerStart * 0.66);
  }
}