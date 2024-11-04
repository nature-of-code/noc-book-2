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
  let wsize = min(windowWidth - 100, windowHeight);
  createCanvas(wsize, wsize);
  colorMode(HSB);
  background(97);
  createControls(wsize + 5);
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

function createControls(left) {
  let vpos = 0;

  cpTitle = createP("Paint Splatter Simulation");
  cpTitle.position(left, vpos - 14);
  cpTitle.style("font-size", "14pt");
  cpTitle.style("font-weight", "bold");
  vpos += 95;

  clearButton = createButton("Clear");
  clearButton.position(left, vpos);
  clearButton.mousePressed(clearButtonClicked);
  vpos += 20;

  spreadTitle = createP("Spread");
  spreadTitle.position(left, vpos);
  vpos += 35;

  spreadSlider = createSlider(0, 0.75, 0.25, 0);
  spreadSlider.position(left, vpos);
  spreadSlider.size(80);
  vpos += 20;

  sizeTitle = createP("Size");
  sizeTitle.position(left, vpos);
  vpos += 35;

  sizeSlider = createSlider(5, 50, 20, 0);
  sizeSlider.position(left, vpos);
  sizeSlider.size(80);
  vpos += 20;

  sizespTitle = createP("Size Spread");
  sizespTitle.position(left, vpos);
  vpos += 35;

  sizespSlider = createSlider(0, 0.1, 0.01, 0);
  sizespSlider.position(left, vpos);
  sizespSlider.size(80);
  vpos += 20;

  baseHueTitle = createP("Base Hue");
  baseHueTitle.position(left, vpos);
  vpos += 35;

  baseHueSlider = createSlider(0, 360, 250, 0);
  baseHueSlider.position(left, vpos);
  baseHueSlider.size(80);
  vpos += 20;

  huespTitle = createP("Hue Spread");
  huespTitle.position(left, vpos);
  vpos += 35;

  huespSlider = createSlider(0, 100, 15, 0);
  huespSlider.position(left, vpos);
  huespSlider.size(80);
  vpos += 20;
  
  alphaTitle = createP("Transparency");
  alphaTitle.position(left, vpos);
  vpos += 35;

  alphaSlider = createSlider(0, 1, 0.75, 0);
  alphaSlider.position(left, vpos);
  alphaSlider.size(80);
  vpos += 20;
}

function clearButtonClicked() {
  background(97);
}
