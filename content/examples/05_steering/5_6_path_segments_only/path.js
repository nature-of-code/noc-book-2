 class Path {

  constructor() {
    this.radius = 20;
    //{!1} A Path is now an ArrayList of points (PVector objects).
    this.points = [];
  }

  // This function allows us to add points to the path.
  addPoint(x, y) {
    let point = createVector(x, y);
    this.points.push(point);
  }

  //{!9} Display the path as a series of points.
  show() {
    
    // Draw thick line for radius
    stroke(200);
    strokeWeight(this.radius * 2);
    noFill();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape();

    // Draw thin line for center of path
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    endShape();
  }
}
