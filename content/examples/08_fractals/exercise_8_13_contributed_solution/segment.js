// The Nature of Code, Exercise 8.13
// Solution by Rick Sidwell
// http://natureofcode.com

// A line segment with an attached note
// Method show() draws the line segment
// Method play() plays the note

// Segment.setup() must be called once before playing any notes.

let synth;

class Segment {
  constructor(a, b, note) {
    this.a = a;
    this.b = b;
    this.note = note;
  }
  
 static setup() {
    synth = new p5.MonoSynth();
  }
  
  show() {
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
  
  play(timeFromNow) {
    let note = midiToFreq(this.note);
    synth.play(note, 0.5, timeFromNow, timeInterval - 0.1);
  }
}