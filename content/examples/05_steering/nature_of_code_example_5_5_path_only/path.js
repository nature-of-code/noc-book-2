class Path {
  constructor() {
    // A path has a radius, how wide is it.
    //{!3} Picking some arbitrary values to initialize the path
    this.radius = 20;
    this.start = createVector(0, height / 3);
    //{!2} A path is only two points, start and end.
    this.end = createVector(width, (2 * height) / 3);
  }

  //{!7} Display the path.
  show() {
    strokeWeight(this.radius * 2);
    stroke(0, 100);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    strokeWeight(1);
    stroke(0);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}
