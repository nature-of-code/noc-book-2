class Creature {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.r = 16;
    this.sensors = [];

    let totalSensors = 15;
    for (let i = 0; i < totalSensors; i++) {
      let a = map(i, 0, totalSensors, 0, TWO_PI);
      let v = p5.Vector.fromAngle(a);
      v.mult(this.r * 2);
      this.sensors[i] = new Sensor(v);
    }
  }

  sense(food) {
    for (let i = 0; i < this.sensors.length; i++) {
      this.sensors[i].sense(this.position, food);
    }
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    for (let sensor of this.sensors) {
      stroke(0);
      line(0, 0, sensor.v.x, sensor.v.y);
      if (sensor.value > 0) {
        fill(255, sensor.value*255);
        stroke(0, 100)
        circle(sensor.v.x, sensor.v.y, 8);
      }
    }
    noStroke();
    fill(0);
    circle(0, 0, this.r * 2);
    pop();
  }
}
