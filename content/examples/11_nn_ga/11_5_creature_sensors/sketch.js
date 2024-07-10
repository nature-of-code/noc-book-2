let creature;
let food;

function setup() {
  createCanvas(640, 240);
  creature = new Creature();
  food = new Food();
}

function draw() {
  background(255);
  creature.position.x = mouseX;
  creature.position.y = mouseY;
  food.show();
  creature.sense(food);
  creature.show();
}
