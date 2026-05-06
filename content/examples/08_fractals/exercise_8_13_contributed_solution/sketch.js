// The Nature of Code, Exercise 8.13
// Solution by Rick Sidwell
// http://natureofcode.com

// This sketch uses an L-system to make music. It extends the solution to Exercise 8.11, 
// adding a new variable "note" to the segments which is an index to the global scale
// containing the notes to use. Turning right or left increases or decreases note, 
// "F" plays the note, and "G" adds a rest. "]" also adds a rest in addition to popping
// the turtle stack.

// The array segments contains either a segment for a normal note, or a 0 for a rest.

// Rather than use the draw loop, it uses a p5.SoundLoop so it can synchronize the
// sound and drawing. For simplicity, this sketch use a p5.MonoSynth to play the notes.

// Scale to use (midi notes for a minor pentatonic scale)
let scale = [44, 46, 48, 49, 51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80, 82];
let timeInterval = 0.2;

let lsystem;
let turtle;
let segments;

let soundLoop;

function setup() {
  createCanvas(640, 240);
  background(255);
  translate(width / 2, height-10);
  stroke(0);
  Segment.setup();
  
  let rules = {
    F: "FF+[+F-F-F]-[-F+F+F]",
  };
  lsystem = new LSystem("F", rules);
  turtle = new Turtle(4, radians(25));

  // Some other rules
  // let ruleset = {
  //   F: "F[-F]F[+F]F",
  // };
  // lsystem = new LSystem("F", ruleset);
  // turtle = new Turtle(2, radians(20));
  
  // let ruleset = {
  //   F: "F[F]-F+F[--F]+F-F",
  // };
  // lsystem = new LSystem("F-F-F-F", ruleset);
  // turtle = new Turtle(4, PI / 2);

  // let ruleset = {
  //   F: "F-F++F-F",
  // };
  // lsystem = new LSystem("F", ruleset);
  // turtle = new Turtle(2, PI/3);
  
  for (let i = 0; i < 4; i++) {
    lsystem.generate();
  }

  segments = turtle.toSegments(lsystem.sentence);
  
  // Set up and start the sound loop
  soundLoop = new p5.SoundLoop(onSoundLoop, timeInterval);
  userStartAudio();
  soundLoop.start();
}

// This replaces draw() for this sketch. It is called by the sound loop
// shortly before the next note should play (exactly how long before it
// should play is passed as the parameter).
function onSoundLoop(timeFromNow) {
  let segment = segments[(soundLoop.iterations - 1) % segments.length];
  if (segment !== 0) {
    segment.play(timeFromNow);
    segment.show();
    if (soundLoop.iterations > segments.length) soundLoop.stop();
  }
}