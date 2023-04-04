//{!1} Start with an axiom.
let current = "A";

function setup() {
  createCanvas(640, 160);
  background(255);
  noLoop();

  // 9 generations
  for (let i = 0; i < 9; i++) {
    generate();
    // Render text to canvas
    textSize(16);
    textFont("courier");
    text(i + ": " + current, 4, 20 + i * 16);
  }
}

function generate() {
  let next = "";
  for (let i = 0; i < current.length; i++) {
    // For every character of the current sentence
    let c = current.charAt(i);
    //{!5} Apply the production rules A->AB, B->A
    if (c == "A") {
      next += "AB";
    } else if (c == "B") {
      next += "A";
    }
  }
  // Save the next generation
  current = next;
}
