// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// An LSystem has a starting sentence
// An a ruleset
// Each generation recursively replaces characters in the sentence
// Based on the ruleset

// Construct an LSystem with a starting sentence and a ruleset
class LSystem {
  constructor(axiom, rules) {
    this.sentence = axiom; // The sentence (a String)
    this.ruleset = rules; // The ruleset (an array of Rule objects)
  }

  // Generate the next generation
  generate() {
    // An empty string that we will fill
    let nextgen = "";
    // For every character in the sentence
    for (let i = 0; i < this.sentence.length; i++) {
      // What is the character
      let c = this.sentence.charAt(i);
      // Replace it with itself unless it matches one of our rules
      if (this.ruleset[c]) {
        nextgen += this.ruleset[c];
      } else {
        nextgen += c;
      }
    }
    // Replace sentence
    this.sentence = nextgen;
  }

}