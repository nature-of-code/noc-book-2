// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Turtle {
  constructor(length, angle) {
    this.length = length;
    this.angle = angle;
  }

  render(sentence) {
    stroke(0);
    textSize(20);
    for (let i = 0; i < sentence.length; i++) {
      let c = sentence.charAt(i);
      if (c === "A") {
        strokeWeight(2);
        stroke(0);
        line(0, 0, this.length, 0);
        noStroke();
        fill(0);
        textAlign(CENTER);
        text("A", this.length / 2, 24);
        translate(this.length, 0);
      } else if (c === "B") {
        noStroke();
        fill(0);
        textAlign(CENTER);
        text("B", this.length / 2, 24);
        translate(this.length, 0);
      }
    }
  }
}
