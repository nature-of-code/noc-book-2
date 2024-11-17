// The Nature of Code, Exercise 0.8
// Solution by Rick Sidwell, modified by Tuan
// http://natureofcode.com

// Controls
let octavesSlider;
let falloffSlider;
let xoffSlider;
let yoffSlider;


function setup() {
  createCanvas(640, 240);
  colorMode(HSB);
  createControls(280);
}

function draw() {

  //map slider values to variables
  noiseDetail(octavesSlider.value(), falloffSlider.value());
  const xoffValue = xoffSlider.value();
  const yoffValue = yoffSlider.value();
  
  // Tell p5 we will work with pixels
  loadPixels();

  let xoff=0.0;
  // Updating pixels with perlin noise
  for (let x = 0; x < width; x++) {
    let yoff=0.0;
    
    for (let y = 0; y < height; y++) {
      // Calculating brightness value for noise
      const bright = map(noise(xoff, yoff), 0, 1, 0, 255);
      //Calculating hue value for noise
      const hu = map(noise(xoff, yoff), 0,1,0,360);
      const col = color(hu, 100, bright);
      set(x, y, col);
      yoff += yoffValue;
    }
    xoff+= xoffValue;
  }
  
  updatePixels();

}

function createControls(ypos) {
  let xpos = 0;
  
  cpTitle = createP("Perlin Noise");
  cpTitle.position(xpos, ypos-30);
  cpTitle.style("font-size", "14pt");
  cpTitle.style("font-weight", "bold");
  xpos += 120;

  randomizeButton = createButton("Randomize");
  randomizeButton.position(xpos, ypos-30);
  randomizeButton.mousePressed(randomizeButtonClicked);
  
  xpos =0;
  octavesTitle = createP("Octaves");
  octavesTitle.position(xpos, ypos);
  xpos += 60;

  octavesSlider = createSlider(1, 10, 4, 1);
  octavesSlider.position(xpos, ypos);
  octavesSlider.size(80);
  xpos += 100;
  
  falloffTitle = createP("Falloff");
  falloffTitle.position(xpos, ypos);
  xpos += 50;

  falloffSlider = createSlider(0, 1, 0.5, 0);
  falloffSlider.position(xpos, ypos);
  falloffSlider.size(80);
  xpos += 100;
  
  xoffTitle = createP("xoff");
  xoffTitle.position(xpos, ypos);
  xpos += 30;

  xoffSlider = createSlider(0.01, 0.1, 0.01, 0.01);
  xoffSlider.position(xpos, ypos);
  xoffSlider.size(80);
  xpos += 100;
  
  yoffTitle = createP("yoff");
  yoffTitle.position(xpos, ypos);
  xpos += 30;

  yoffSlider = createSlider(0.01,0.1,0.01, 0.01);
  yoffSlider.position(xpos, ypos);
  yoffSlider.size(80);
  xpos += 100;


}

function randomizeButtonClicked() {
  noiseSeed(random(0, 1000000));
}