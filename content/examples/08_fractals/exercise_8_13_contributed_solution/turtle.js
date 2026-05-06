// The Nature of Code, Exercise 8.13
// Solution by Rick Sidwell
// http://natureofcode.com

class Turtle {
  constructor(length, angle) {
    this.length = length;
    this.angle = angle;
  }

  // Method render is the same as Example 8.9 in The Nature of Code
  // It draws the sentence using turtle graphics
  render(sentence) {
    stroke(0);
    for (let i = 0; i < sentence.length; i++) {
      let c = sentence.charAt(i);
      if (c === "F") {
        line(0, 0, 0, -this.length);
        translate(0, -this.length);
      } else if (c === "G") {
        translate(0, -this.length);
      } else if (c === "+") {
        rotate(this.angle);
      } else if (c === "-") {
        rotate(-this.angle);
      } else if (c === "[") {
        push();
      } else if (c === "]") {
        pop();
      }
    }
  }
  
  // Method toSegments is an alternative to render that returns an array of
  // segments specified by the sentence instead of drawing it
  // This version also adds a note to play to the segments
  toSegments(sentence) {
    // accumulates the segments as the turtle "draws" them
    let segments = [];
    
    // current location of the turtle
    let turtlePoint = createVector(0, 0);
    
    // vector representing the direction the turtle is facing
    // and the length of lines to "draw"
    let turtleVector = p5.Vector.fromAngle(-PI/2, this.length);
    
    // stores the previous turtlePoint and turtleVector when "["
    // is seen so it can be resored by a subsequent "]"
    let turtleStack = [];
    
    // index of the current note, starting with the middle of the scale
    let noteIdx = floor(scale.length / 2);
    
    for (let i = 0; i < sentence.length; i++) {
      let c = sentence.charAt(i);
      if (c === "F") {
        segments.push(new Segment(turtlePoint.copy(), p5.Vector.add(turtlePoint, turtleVector), scale[noteIdx]));
        turtlePoint.add(turtleVector);
      } else if (c === "G") {
        turtlePoint.add(turtleVector);
        segments.push(0);
      } else if (c === "+") {
        turtleVector.rotate(this.angle);
        noteIdx += 1;
        if (noteIdx > scale.length) noteIdx -= scale.length;
      } else if (c === "-") {
        turtleVector.rotate(-this.angle);
        noteIdx -= 1;
        if (noteIdx < 0) noteIdx += scale.length;
      } else if (c === "[") {
        turtleStack.push([turtlePoint.copy(), turtleVector.copy(), noteIdx]);
      } else if (c === "]") {
        [turtlePoint, turtleVector, noteIdx] = turtleStack.pop();
        segments.push(0);
      }
    }
    return segments;
  }
}