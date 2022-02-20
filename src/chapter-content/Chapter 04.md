# Chapter 4. Particle Systems
“That is wise. Were I to invoke logic, however, logic clearly dictates that the needs of the many outweigh the needs of the few.”
In 1982, William T. Reeves, a researcher at Lucasfilm Ltd., was working on the film *Star Trek II: The Wrath of Khan*. Much of the movie revolves around the Genesis Device, a torpedo that when shot at a barren, lifeless planet has the ability to reorganize matter and create a habitable world for colonization. During the sequence, a wall of fire ripples over the planet while it is being “terraformed.” The term ***particle system***, an incredibly common and useful technique in computer graphics, was coined in the creation of this particular effect.
“A particle system is a collection of many many minute particles that together represent a fuzzy object. Over a period of time, particles are generated into a system, move and change from within the system, and die from the system.”  —William Reeves, "Particle Systems—A Technique for Modeling a Class of Fuzzy Objects," ACM Transactions on Graphics 2:2 (April 1983), 92.
Since the early 1980s, particle systems have been used in countless video games, animations, digital art pieces, and installations to model various irregular types of natural phenomena, such as fire, smoke, waterfalls, fog, grass, bubbles, and so on.
This chapter is dedicated to looking at implementation strategies for coding a particle system. How do you organize your code? Where do you store information related to individual particles versus information related to the system as a whole? The examples I’ll cover will focus on managing the data associated with a particle system. They’ll use simple shapes for the particles and apply only the most basic behaviors (such as gravity). However, by building on this framework and adding more interesting ways to render the particles and compute behaviors, you can achieve a variety of effects.
## 4.1 Why You Need Particle Systems
I’ve defined a particle system to be a collection of independent objects, often represented by a simple shape or dot. Why does this matter? Certainly, the prospect of modeling some of the phenomena listed (explosions!) is attractive and potentially useful. But really, there’s an even better reason to explore particle systems. If you want to get anywhere in this nature of code life, you’re likely to find yourself developing systems of *many* things–balls bouncing, birds flocking, ecosystems evolving, all sorts of things in plural.
Just about every chapter after this one is going to deal with a list of objects. Yes, I’ve dipped my toe in the array waters in some of the first vector and forces examples. But now it‘s time to go where no array has gone before.
First, I’m going to want to deal with flexible quantities of elements. Some examples will have zero things, sometimes one thing, sometimes ten things, and sometimes ten thousand things. Second, I’m going to want to take a more sophisticated object-oriented approach. Instead of writing a class to describe a single particle, I’m also going to want to write a class that describes the collection of particles—the particle system itself. The goal here is to be able to write a sketch that looks like the following:

 ``` 
// Ah, isn’t this main program so simple and lovely?
let system;

function setup() {
  createCanvas(640, 360);
  system = new ParticleSystem();
}

function draw() {
  background(255);
  system.run();
}
 ``` 

No single particle is ever referenced in the above code, yet the result will be full of particles flying all over the screen. Getting used to writing p5.js sketches with multiple classes, and classes that keep lists of instances of other classes, will prove very useful as you get to later chapters in this book.
Finally, working with particle systems is also a good excuse to tackle two other object-oriented programming techniques: inheritance and polymorphism. With the examples you’ve seen up until now, I’ve always used an array of a single type of object, like "movers" or “oscillators.” With inheritance (and polymorphism), I’ll demonstrate a convenient way to store a single list containing objects of different types. This way, a particle system need not only be a system of a single type of particle.
Though it may seem obvious to you, I’d also like to point out that my examples are modeled after conventional implementations of particle systems, and that’s where I will begin in this chapter. However, the fact that the particles in this chapter look or behave a certain way should not limit your imagination. Just because particle systems tend to look sparkly, fly forward, and fall with gravity doesn’t mean that those are the characteristics yours should have.
The focus here is on how to keep track of a system of many elements. What those elements do and how those elements look is up to you.
## 4.2 A Single Particle
Before I can get rolling on coding the system itself, I need to write the class to describe a single particle. The good news: I’ve done this already! The Mover class from Chapter 2 serves as the perfect template. A particle is an independent body that moves about the canvas. It has position, velocity, and acceleration, a constructor to initialize those variables, and functions to display() itself and update() its position.

 ``` 
class Particle {
  //{!3} A “Particle” object is just another name for our “Mover.” It has position, velocity, and acceleration.
  Particle(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector();
    this.velocity = createVector();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  display() {
    stroke(0);
    fill(175);
    circle(this.position.x, this.position.y, 8);
  }
}
 ``` 

This is about as simple as a particle can get. From here, I could take the particle in several directions. I could add the applyForce() function to affect the particle’s behavior (I’ll do precisely this in a future example). I could also add variables to describe color and shape, or load a p5.Image to draw the particle. For now, however, I’ll focus on adding just one additional detail: ***lifespan***.
Some particle systems involve something called an ***emitter***. The emitter is the source of the particles and controls the initial settings for the particles: position, velocity, and more. An emitter might emit a single burst of particles, or a continuous stream of particles, or both. The new feature here is that a particle born at the emitter does not live forever. If it were to live forever, the p5.js sketch would eventually grind to a halt as the amount of particles increases to an unwieldy number over time. As new particles are born, old particles need to be removed. This creates the illusion of an infinite stream of particles, and the performance of the sketch does not suffer. There are many different ways to decide when a particle is ready to be removed. For example, it could come into contact with another object, or it could leave the canvas. For this first Particle class, I’ll choose to add a lifespan variable that acts like a countdown timer. The timer will start at 255 and count down to 0, when the particle will be considered “dead.” The code for this in the Particle class as:

 ``` 
class Particle {

  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector();
    this.velocity = createVector();
    //{!1 .bold} A new variable to keep track of how long the particle has been “alive”. We start at 255 and count down for convenience
    this.lifespan = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //{!1 .bold}  Lifespan decreases
    this.lifespan -= 2.0;
  }

  display() {
    //{!2 .bold}  Since the life ranges from 255 to 0 it can be used also for alpha
    stroke(0, this.lifespan);
    fill(175, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }
}
 ``` 

The reason I chose to start the lifespan at 255 and count down to 0 is for convenience. With those values, I can assign lifespan to act as the alpha transparency for the circle as well. When the particle is “dead” it will also have faded away.
With the addition of the lifespan property, I’ll also need one additional function—a function that can be queried (for a true or false answer) as to whether the particle is alive or dead. This will come in handy when writing the ParticleSystem class, whose task will be to manage the list of particles themselves. Writing this function is pretty easy; I just need to check and see if the value of lifespan is less than 0. If it is return true, if not return false.

 ``` 
  isDead() {
    //{!4} Is the particle still alive?
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
 ``` 

Or more simply, I can return the result of the boolean expression itself!

 ``` 
    isDead() {
      //{!4} Is the particle still alive?
      return (this.lifespan < 0.0);
    }
 ``` 

Before I get to the next step of making many particles, it’s worth taking a moment to make sure the particle works correctly and create a sketch with one single Particle object. Here is the full code below, with one small addition–giving the particle a random initial velocity as well as adding applyForce() (to simulate gravity).

**Example 4.1: A single particle**

 ``` 
let particle;

function setup() {
  createCanvas(640, 360);
  particle = new Particle(width / 2, 10);
}

function draw() {
  background(255);
  //{!2} Operating the single Particle
  particle.update();
  particle.display();

  //{!2} Applying a gravity force
  let gravity = createVector(0, 0.1);
  particle.applyForce(gravity);

  //{!3} Checking the particle's state
  if (p.isDead()) {
    print("Particle dead!");
  }
}

class Particle {

  constructor(x,y) {
    this.position =  createVector(x, y);
    //{.offset-top} For demonstration purposes the Particle a random velocity.
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255.0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
  }

  display() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }

  //{!3} Keeping the same physics model as with previous chapters
  applyForce(force) {
    this.acceleration.add(force);
  }

  //{!7} Is the Particle alive or dead?
  isDead() {
    return (this.lifespan < 0.0);
  }
}
 ``` 

### Exercise 4.1
Create a run() function in the Particle class that handles update(), display, and applyForce. What are the pros and cons of this approach?
### Exercise 4.2
Add angular velocity (rotation) to the particle. Create your own non-circle particle design.
Armed with a class to describe a single particle, I’m ready for the next big step. How do you keep track of many particles, not knowing exactly how many particles you might have at any given time?
## 4.3 The Array
Thankfully, the wonderful JavaScript Array has all the functionality we need for managing a list of Particle objects. The the built-in JavaScript functions available in the JavaScript class Array will allow me to add and remove particles and manipulate the arrays in all sorts of powerful ways. Although there are some cons to this approach, in order to keep the subsequent code examples more concise, I'm use a solution to Exercise 4.1 and assume a run() method that handles all of the particle's functionality. [JavaScript Array Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
JavaScript Array Documentation.

 ``` 
let total = 10;
// Starting with an empty array
let particles = [];

function setup() {
  //{!3} This is what you’re probably used to, accessing elements on the array via an index and brackets—[].
  for (let i = 0; i < total; i++) {
    particles[i] = new Particle(width/2, height/2);
  }
}

function draw() {
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.run();
  }
}
 ``` 

This last for loop demonstrates how to call functions on every element of an array by accessing each index. I initialize a variable i with value 0 and count up by 1, accessing each element of the array until I reach the end. However, this is a good time to mention the JavaScript "for of loop”, which is a bit more concise. The "for of" loop works with arrays as follows:

 ``` 
function draw() {
  for (let particle of particles){
    particle.run();
  }
}
 ``` 

Let’s translate that. Say “each” instead of “let” and “in” instead of “of”:
“For each particle in particles, update and display that particle!”
I know. You cannot contain your excitement. I can’t. I know it’s not necessary, but I just have to type that again.

 ``` 
for (let particle of particles){
  particle.run();
}
 ``` 

Simple, elegant, concise, lovely. Take a moment. Breathe. I have some bad news. Yes, I may love that "for of" loop and I will get to use it in examples. But not just yet.
The code I’ve written above doesn’t take advantage of the JavaScript's ability to remove elements from an array. I need to design an example that fits with the particle system scenario, where a continuous stream of particles are emitted, adding one new particle with each cycle through draw(). I’ll skip rehashing the Particle class code here, as it doesn’t need to change. What we have so far is:

 ``` 
let particles = [];

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);
  //{!1 .offset-top} A new Particle object is added to the array every cycle through draw().
  particles.push(new Particle(width/2, 50));

  for (let particle of particles) {
    particle.run();
  }
}
 ``` 

Run the above code for a few minutes and you’ll start to see the frame rate slow down further and further until the program grinds to a halt (my tests yielded horrific performance after fifteen minutes). The issue of course is that I am adding more and more particles without removing any.
Fortunately, particles can be removed from the array referencing the index position of the particle to be removed. This is why I cannot use the enhanced for of loop; this loop provides no means for deleting elements while iterating. Instead, I can use the Array splice() method. (Yes, an array in JavaScript is actually an object created from the class Array with many methods!). The splice() method removes one or more elements from an array starting from a given index.

 ``` 
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.run();
    if (particle.isDead()) {
      // Remove one particle at index i
      particles.splice(i, 1);
    }
  }
 ``` 

Although the above code will run just fine (and the program will never grind to a halt), I have opened up a medium-sized can of worms. Whenever you manipulate the contents of an array while iterating through that very array, you can get into trouble. Take, for example, the following code.

 ``` 
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.run();
    //{!1 .offset-top} Adding a new Particle to the list while iterating?
    particles.push(new Particle(width / 2, 50));
  }
 ``` 

This is a somewhat extreme example (with flawed logic), but it proves the point. In the above case, for each particle in the array, I add a new particle to that array (and so the length of the array increases). This results in an infinite loop, as i will never increment past the size of the array.
While removing elements from the array during a loop doesn’t cause the program to crash (as it does with adding), the problem is almost more insidious in that it leaves no evidence. To discover the flaw I must first establish an important fact. When an object is removed from the array withsplice(), all elements are shifted one spot to the left. Note the diagram below where particle C (index 2) is removed. particles A and B keep the same index, while particles D and E shift from 3 and 4 to 2 and 3, respectively.

Figure 4.1
Let’s pretend we are i looping through the array.
when i = 0 → Check particle A → Do not deletewhen i = 1 → Check particle B → Do not deletewhen i = 2 → Check particle C → Delete!Slide particles D and E back from slots 3 and 4 to 2 and 3when i = 3 → Check particle E → Do not delete
Notice the problem? Particle D was never checked! When C was deleted from slot #2, D moved into slot #2, but i has already moved on to slot #3. This is not a total disaster, since particle D will get checked the next time around. Still, the expectation is that the code should iterate through every single element of the array. Skipping one is unacceptable!
There are two solutions to this problem. The first solution is to iterate through the array backwards. If you are sliding elements from right to left as elements are removed, it’s impossible to skip an element. Here’s how the code looks:

 ``` 
  //{!1 .bold} Looping through the list backwards
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.run();
    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
 ``` 

A second solution is to use something known as a “higher-order” function. A higher-order function is one that receives another function as an argument (or returns a function). In the case of JavaScript arrays there are many higher-order functions. A common one is sort() which takes as its argument a function that defines how to compare two elements of the array (therefore sorting the array according to that comparison.) Here, I can make use of the higher order function filter(). filter() checks each item in the specified array and keeps only the item(s) where the given condition is true (removing those that return false).

 ``` 
  particles = particles.filter(function(particle) {
    // Keep particles that are not dead!
    return !particle.isDead();
  });
 ``` 

This is more commonly written using JavaScript's arrow notation. (To learn more, you can watch this [higher-order functions and arrow notation video tutorial](https://youtu.be/H4awPsyugS0)
higher-order functions and arrow notation video tutorial.)

 ``` 
  particles = particles.filter(particle => !particle.isDead());
 ``` 

For the purposes of this book, I am going to stick with the splice() method, but I encourage you to explore writing your code with higher-order functions and arrow notation.

**Example 4.2: Array of particles**

 ``` 
let particles = [];

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);

  particles.push(new Particle(width / 2, 50);

  //{!1} Looping through the array backwards for deletion
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.run();
    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
}
 ``` 

## 4.4 The Particle System Class
OK. Now I’ve done two things. I’ve written a class to describe an individual Particle object. I’ve conquered the array and used it to manage a list of many particles (with the ability to add and delete at will).
I could stop here. However, one additional step I can and should take is to write a class to describe the list of Particle objects itself—the ParticleSystem class. This allows me to remove the bulky logic of looping through all particles from draw(), as well as open up the possibility of having more than one particle system.
If you recall the goal I set at the beginning of this chapter was to write code like:

 ``` 
//{!1} Just one wee ParticleSystem!
let system;

function setup() {
  createCanvas(640, 360);
  system = new ParticleSystem();
}

function draw() {
  background(255);
  system.run();
}
 ``` 

Let’s take the code from Example 4.2 and review a bit of object-oriented programming, looking at how each piece setup() and draw() can fit into the ParticleSystem class.
I could also add new features to the particle system itself. For example, it might be useful for the ParticleSystem class to keep track of an origin point where particles are made. This fits with the idea of a particle system being an “emitter,” a place where particles are born and sent out into the world. The origin point could be initialized in the constructor.
**Example 4.3: Simple Single Particle System**

 ``` 
class ParticleSystem {

  ParticleSystem(x, y) {
    //{!1 .bold} This particular ParticleSystem implementation includes an origin point where each Particle begins.
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    //{!1 .bold}  The origin is passed to each Particle when it is added.
    this.particles.add(new Particle(origin.x, origin.y));
  }
 ``` 

### Exercise 4.3
Make the origin point move dynamically. Emit particles from the mouse position or use the concepts of velocity and acceleration to make the system move autonomously.
### Exercise 4.4
Building off Chapter 3’s “Asteroids” example, use a particle system to emit particles from the ship’s “thrusters” whenever a thrust force is applied. The particles’ initial velocity should be related to the ship’s current direction.
## 4.5 A System of Systems
Let’s take a moment to recap what I’ve covered so far. I described an individual Particle object. I also described a system of Particle objects, and this we call a “particle system.” And I’ve defined a particle system as a collection of independent objects. But isn’t a particle system itself an object? If that’s the case (which it is), there’s no reason why I couldn’t also build a collection of many particle systems, i.e. a system of systems.
This line of thinking could of course take you even further, and you might lock yourself in a basement for days sketching out a diagram of a system of systems of systems of systems of systems of systems. Of systems. After all, I could create a description of the world in this way. An organ is a system of cells, a human body is a system of organs, a neighborhood is a system of human bodies, a city is a system of neighborhoods, and so on and so forth. While this is an interesting road to travel down, it’s a bit beyond where I’d like to be right now. It is, however, quite useful to know how to write a p5.js sketch that keeps track of many particle systems, each of which keep track of many particles. Take the following scenario.
You start with a blank screen.

You click the mouse and generate a particle system at the mouse’s position.

Each time you click the mouse, a new particle system is created at the mouse’s position.

In Example [4.3](about:blank#chapter04_example3)
4.3, I stored a single reference to a ParticleSystem object in the variable system.

 ``` 
let ps;

function setup() {
  createCanvas(640, 360);
  system = new ParticleSystem(1, createVector(width/2, 50));
}

function draw() {
  background(255);
  system.run();
  system.addParticle();
}
 ``` 

For this new example, what I want to do instead is create an Array to keep track of multiple instances of particle systems themselves. When the sketch begins, i.e. in setup(), the Array is empty.
**Example 4.4: System of systems**

 ``` 
//{!1} This time, the type of thing we are putting in the ArrayList is a ParticleSystem itself!
let systems = [];

function setup() {
  createCanvas(600, 200);
}
 ``` 

Whenever the mouse is pressed, a new ParticleSystem object is created and placed into the Array.

 ``` 
function mousePressed() {
  systems.push(new ParticleSystem(createVector(mouseX, mouseY)));
}
 ``` 

And in draw(), instead of referencing a single ParticleSystem object, I can now iterate over all the systems in the Array and call run() on each of them.
