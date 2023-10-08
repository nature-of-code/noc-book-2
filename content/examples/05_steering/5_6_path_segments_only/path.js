 class Path {
  constructor() {
    this.radius = 20;
    //{!1} A path is now an array of points (p5.Vector objects).
    this.points = [];
  }

  //{!4} This method allows us to add points to the path.
  addPoint(x, y) {
    let pathPoint = createVector(x, y);
    this.points.push(pathPoint);
  }

  show() {
    //{!8} Draw a thicker gray line for the path radius.
    stroke(200);
    strokeWeight(this.radius * 2);
    noFill();
    beginShape();
    for (let pathPoint of this.points) {
      vertex(pathPoint.x, pathPoint.y);
    }
    endShape();

    //{!7} Draw a thin line for the path center.
    stroke(0);
    strokeWeight(1);
    beginShape();
    for (let pathPoint of this.points) {
      vertex(pathPoint.x, pathPoint.y);
    }
    endShape();
  }
}