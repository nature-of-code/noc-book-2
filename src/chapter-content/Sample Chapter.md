“This is a quote.”
— Name
## Section Header
Paragraph of text


Another paragraph of text

 ``` 
// This is code block
let pos = createVector(x, y);
 ``` 

Another paragraph of text
>This is an extra callout box of text not part of the regular flow.
Another paragraph of text

>Example X.X
p5-sketch: >https://editor.p5js.org/natureofcode/sketches/SkYSWlb_x


 ``` 
let movers = [];

let G = 1;

function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(width), random(height), random(0.1, 2));
  }
}

function draw() {
  background(0);

  for (let i = 0; i < movers.length; i++) {
    for (let j = 0; j < movers.length; j++) {
      if (i !== j) {
        let force = movers[j].attract(movers[i]);
        movers[i].applyForce(force);
      }
    }

    movers[i].update();
    movers[i].display();
  }
}
 ``` 

Some more written text
>Exercise X.X
>Building off Chapter 3’s “Asteroids” example, use a particle system to emit particles from the ship’s “thrusters” whenever a thrust force is applied. The particles’ initial velocity should be related to the ship’s current direction.
>Exercise X.X
>Make the origin point move dynamically. Emit particles from the mouse position or use the concepts of velocity and acceleration to make the system move autonomously.



