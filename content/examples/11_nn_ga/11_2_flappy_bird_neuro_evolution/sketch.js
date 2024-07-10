let birds = [];
let pipes = [];

function setup() {
  createCanvas(640, 240);
  ml5.tf.setBackend("cpu");
  for (let i = 0; i < 200; i++) {
    birds[i] = new Bird();
  }
  pipes.push(new Pipe());
}

function draw() {
  background(255);

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  for (let bird of birds) {
    if (bird.alive) {
      for (let pipe of pipes) {
        if (pipe.collides(bird)) {
          bird.alive = false;
        }
      }
      bird.think(pipes);
      bird.update();
      bird.show();
    }
  }

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }

  if (allBirdsDead()) {
    normalizeFitness();
    reproduction();
    resetPipes();
  }
}

function allBirdsDead() {
  for (let bird of birds) {
    if (bird.alive) {
      return false;
    }
  }
  return true;
}

function reproduction() {
  let nextBirds = [];
  for (let i = 0; i < birds.length; i++) {
    let parentA = weightedSelection();
    let parentB = weightedSelection();
    let child = parentA.crossover(parentB);
    child.mutate(0.01);
    nextBirds[i] = new Bird(child);
  }
  birds = nextBirds;
}

// Normalize all fitness values
function normalizeFitness() {
  let sum = 0;
  for (let bird of birds) {
    sum += bird.fitness;
  }
  for (let bird of birds) {
    bird.fitness = bird.fitness / sum;
  }
}

function weightedSelection() {
  // Start with the first element
  let index = 0;
  // Pick a starting point
  let start = random(1);
  // At the finish line?
  while (start > 0) {
    // Move a distance according to fitness
    start = start - birds[index].fitness;
    // Next element
    index++;
  }
  // Undo moving to the next element since the finish has been reached
  index--;
  //{!1} Instead of returning the entire Bird object, just the brain is returned
  return birds[index].brain;
}

function resetPipes() {
  // Remove all the pipes but the very latest one
  pipes.splice(0, pipes.length - 1);
}
