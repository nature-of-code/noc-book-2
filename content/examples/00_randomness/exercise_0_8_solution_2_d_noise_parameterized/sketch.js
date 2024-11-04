// The Nature of Code, Exercise 0.8
// Solution by Rick Sidwell, modified by Tuan
// http://natureofcode.com

// Controls
let octavesSlider;
let falloffSlider;
let xoffSlider;
let yoffSlider;


function setup() {
  let wsize = 600;
  createCanvas(wsize, wsize);
  colorMode(HSB);
  createControls(wsize + 5);
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

function createControls(left) {
  let vpos = 0;
  
  cpTitle = createP("Perlin Noise");
  cpTitle.position(left, vpos - 14);
  cpTitle.style("font-size", "14pt");
  cpTitle.style("font-weight", "bold");
  vpos += 55;

  randomizeButton = createButton("Randomize");
  randomizeButton.position(left, vpos);
  randomizeButton.mousePressed(randomizeButtonClicked);
  vpos += 20;

  octavesTitle = createP("Octaves");
  octavesTitle.position(left, vpos);
  vpos += 35;

  octavesSlider = createSlider(1, 10, 4, 1);
  octavesSlider.position(left, vpos);
  octavesSlider.size(80);
  vpos += 20;
  
  falloffTitle = createP("Falloff");
  falloffTitle.position(left, vpos);
  vpos += 35;

  falloffSlider = createSlider(0, 1, 0.5, 0);
  falloffSlider.position(left, vpos);
  falloffSlider.size(80);
  vpos += 20;
  
  xoffTitle = createP("xoff");
  xoffTitle.position(left, vpos);
  vpos += 35;

  xoffSlider = createSlider(0.01, 0.1, 0.01, 0.01);
  xoffSlider.position(left, vpos);
  xoffSlider.size(80);
  vpos += 20;
  
  yoffTitle = createP("yoff");
  yoffTitle.position(left, vpos);
  vpos += 35;

  yoffSlider = createSlider(0.01,0.1,0.01, 0.01);
  yoffSlider.position(left, vpos);
  yoffSlider.size(80);
  vpos += 20;


}

function randomizeButtonClicked() {
  noiseSeed(random(0, 1000000));
}