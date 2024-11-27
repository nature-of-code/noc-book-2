// The Nature of Code, Exercise 0.4
// Solution by Rick Sidwell
// http://natureofcode.com

// Controls
let spreadSlider;
let sizeSlider;
let sizespSlider;
let baseHueSlider;
let huespSlider;
let alphaSlider;

function setup() {
  
  createCanvas(640, 240);
  colorMode(HSB);
  background(97);
  createControls(300);
  
}

function draw() {
  translate(width / 2, height / 2);
  scale(height / 2);

  x = randomGaussian(0, spreadSlider.value());
  y = randomGaussian(0, spreadSlider.value());
  size = randomGaussian(sizeSlider.value() / height, sizespSlider.value());
  if (size <= 0) {
    size = 0.001;
  }

  let paintHue = randomGaussian(baseHueSlider.value(), huespSlider.value());
  let paintSat = randomGaussian(80, 20);
  let paintBright = randomGaussian(80, 20);
  if (paintHue < 0) {
    paintHue += 360;
  } else if (paintHue >= 360) {
    paintHue -= 360;
  }
  if (paintSat > 100) {
    paintSat = 100;
  }
  if (paintBright > 100) {
    paintBright = 100;
  }

  noStroke();
  fill(paintHue, paintSat, paintBright, alphaSlider.value());
  ellipse(x, y, size, size);
}

function createControls(ypos) {
  let xpos = 0;

  cpTitle = createP("Paint Splatter Simulation");
  cpTitle.position(xpos, ypos -50);
  cpTitle.style("font-size", "14pt");
  cpTitle.style("font-weight", "bold");
  xpos += 220;

  clearButton = createButton("Clear");
  clearButton.position(xpos, ypos-50);
  clearButton.mousePressed(clearButtonClicked);
  
 
  xpos=0;
  spreadTitle = createP("Spread");
  spreadTitle.position(xpos, ypos);
  xpos += 50;

  spreadSlider = createSlider(0, 0.75, 0.25, 0);
  spreadSlider.position(xpos, ypos);
  spreadSlider.size(80);
  xpos += 100;

  sizeTitle = createP("Size");
  sizeTitle.position(xpos, ypos);
  xpos += 35;

  sizeSlider = createSlider(5, 50, 20, 0);
  sizeSlider.position(xpos, ypos);
  sizeSlider.size(80);
  xpos += 100;

  sizespTitle = createP("Size Spread");
  sizespTitle.position(xpos, ypos);
  xpos += 80;

  sizespSlider = createSlider(0, 0.1, 0.01, 0);
  sizespSlider.position(xpos, ypos);
  sizespSlider.size(80);
  xpos += 100;

  xpos=0;
  baseHueTitle = createP("Base Hue");
  baseHueTitle.position(xpos, ypos+30);
  xpos += 70;

  baseHueSlider = createSlider(0, 360, 250, 0);
  baseHueSlider.position(xpos, ypos+30);
  baseHueSlider.size(80);
  xpos += 100;

  huespTitle = createP("Hue Spread");
  huespTitle.position(xpos, ypos+30);
  xpos += 80;

  huespSlider = createSlider(0, 100, 15, 0);
  huespSlider.position(xpos, ypos+30);
  huespSlider.size(80);
  xpos += 100;
  
  alphaTitle = createP("Transparency");
  alphaTitle.position(xpos, ypos+30);
  xpos += 90;

  alphaSlider = createSlider(0, 1, 0.75, 0);
  alphaSlider.position(xpos, ypos+30);
  alphaSlider.size(80);
  xpos += 100;
}

function clearButtonClicked() {
  background(97);
}
