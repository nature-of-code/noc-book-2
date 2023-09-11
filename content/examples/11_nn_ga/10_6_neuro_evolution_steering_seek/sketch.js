let creatures = [];
let timeSlider;
let lifeSpan = 250; // How long should each generation live
let lifeCounter = 0; // Timer for cycle of generation
let food;
let generations = 0;

function setup() {
  createCanvas(640, 240);
  ml5.tf.setBackend("cpu");
  for (let i = 0; i < 50; i++) {
    creatures[i] = new Creature(random(width), random(height));
  }
  glow = new Glow();
  timeSlider = createSlider(1, 20, 1);
  timeSlider.position(10, 220);
}

function draw() {
  background(255);

  glow.update();
  glow.show();

  for (let creature of creatures) {
    creature.show();
  }

  for (let i = 0; i < timeSlider.value(); i++) {
    for (let creature of creatures) {
      creature.seek(glow);
      creature.update(glow);
    }
    lifeCounter++;
  }

  if (lifeCounter > lifeSpan) {
    normalizeFitness();
    reproduction();
    lifeCounter = 0;
    generations++;
  }
  fill(0);
  noStroke();
  text("Generation #: " + generations, 10, 18);
  text("Cycles left: " + (lifeSpan - lifeCounter), 10, 36);
}

function normalizeFitness() {
  let sum = 0;
  for (let creature of creatures) {
    sum += creature.fitness;
  }
  for (let creature of creatures) {
    creature.fitness = creature.fitness / sum;
  }
}

function reproduction() {
  let nextCreatures = [];
  for (let i = 0; i < creatures.length; i++) {
    let parentA = weightedSelection();
    let parentB = weightedSelection();
    let child = parentA.crossover(parentB);
    child.mutate(0.1);
    nextCreatures[i] = new Creature(random(width), random(height), child);
  }
  creatures = nextCreatures;
}

function weightedSelection() {
  let index = 0;
  let start = random(1);
  while (start > 0) {
    start = start - creatures[index].fitness;
    index++;
  }
  index--;
  return creatures[index].brain;
}
