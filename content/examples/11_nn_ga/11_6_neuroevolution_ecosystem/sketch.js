let bloops = [];
let timeSlider;
let food = [];

function setup() {
  createCanvas(640, 240);
  ml5.tf.setBackend("cpu");
  for (let i = 0; i < 20; i++) {
    bloops[i] = new Creature(random(width), random(height));
  }
  for (let i = 0; i < 8; i++) {
    food[i] = new Food();
  }
  timeSlider = createSlider(1, 20, 1);
  timeSlider.position(10, 220);
}

function draw() {
  background(255);
  for (let i = 0; i < timeSlider.value(); i++) {
    for (let i = bloops.length - 1; i >= 0; i--) {
      bloops[i].think();
      bloops[i].eat();
      bloops[i].update();
      bloops[i].borders();
      if (bloops[i].health < 0) {
        bloops.splice(i, 1);
      } else if (random(1) < 0.001) {
        let child = bloops[i].reproduce();
        bloops.push(child);
      }
    }
  }
  for (let treat of food) {
    treat.show();
  }
  for (let bloop of bloops) {
    bloop.show();
  }
}
