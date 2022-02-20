# Chapter 6. Autonomous Agents
“This is an exercise in fictional science, or science fiction, if you like that better.”
Believe it or not, there is a purpose. Well, at least there’s a purpose to the first five chapters of this book. I could stop right here; after all, I’ve covered several different ways of modeling motion and simulating physics. Angry Birds, here we come!
Still, let’s think for a moment. Why are you here? The *nature* of code, right? What have I been demonstrating so far? Inanimate objects. Lifeless shapes sitting in canvas that flop around when affected by forces in their environment. What if you could breathe life into those shapes? What if those shapes could live by their own rules? Can shapes have hopes and dreams and fears? This is what I am here in this chapter to do—develop *autonomous agents*.
## 6.1 Forces from Within
The term ***autonomous agent*** generally refers to an entity that makes its own choices about how to act in its environment without any influence from a leader or global plan. For the context here, “acting” will mean moving. This addition is a significant conceptual leap. Instead of a box sitting on a boundary waiting to be pushed by another falling box, I would like to now design a box that has the ability and “desire” to leap out of the way of that other falling box, if it so chooses. While the concept of forces that come from within is a major shift in design thinking, the code base will barely change, as these desires and actions are simply that—*forces*.
Here are three key components of autonomous agents that I’ll want to keep in mind as I build the examples.
An autonomous agent has a limited ability to perceive environment. It makes sense that a living, breathing being should have an awareness of its environment. What does this mean, however? Throughout all the examples in this chapter, I will point out programming techniques for objects to store references to other objects and therefore “perceive” their environment. It’s also crucial to consider the word limited here. Are you designing an all-knowing rectangle that flies around a p5 window, aware of everything else in that window? Or are you creating a shape that can only examine any other object within fifteen pixels of itself? Of course, there is no right answer to this question; it all depends. I’ll explore several possibilities throughout this chapter. For a simulation to feel more “natural,” however, limitations are a good thing. An insect, for example, may only be aware of the sights and smells that immediately surround it. For a real-world creature, you could study the exact science of these limitations. Luckily, I can just make stuff up and try it out.
An autonomous agent processes the information from its environment and calculates an action. This will be the easy part, as the action is a force. The environment might tell the agent that there’s a big scary-looking shark swimming right at it, and the action will be a powerful force in the opposite direction.
An autonomous agent has no leader. This third principle is something I care a little less about for the context here. After all, if you are designing a system where it makes sense to have a leader barking commands at various entities, then that’s what you’ll want to implement. Nevertheless, many of these examples will have no leader for an important reason. Towards the end of this chapter, I'll examine group behaviors and look at designing collections of autonomous agents that exhibit the properties of complex systems— intelligent and structured group dynamics that emerge not from a leader, but from the local interactions of the elements themselves.
In the late 1980s, computer scientist [Craig Reynolds](http://www.red3d.com/cwr/)
Craig Reynolds developed algorithmic steering behaviors for animated characters. These behaviors allowed individual elements to navigate their digital environments in a “lifelike” manner with strategies for fleeing, wandering, arriving, pursuing, evading, and more. Used in the case of a single autonomous agent, these behaviors are fairly simple to understand and implement. In addition, by building a system of multiple characters that steer themselves according to simple, locally based rules, surprising levels of complexity emerge. The most famous example is Reynolds’s “boids” model for “flocking/swarming” behavior.
## 6.2 Vehicles and Steering
Now that I‘ve discussed the core concepts behind autonomous agents, it‘s time to begin writing the code. There are many places where I could start. Artificial simulations of ant and termite colonies are fantastic demonstrations of systems of autonomous agents. (For more on this topic, I encourage you to read *Turtles, Termites, and Traffic Jams* by Mitchel Resnick.) However, I want to begin by examining agent behaviors that build on the work in the first five chapters of this book: modeling motion with vectors and forces. And so it’s time to once again rename the Mover class that became the Particle class. This time I am going to call it Vehicle.

 ``` 
class Vehicle {

  constructor(){
    this.position = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();
  }

  [inline]// What else do I need to add?
 ``` 

In his 1999 paper “Steering Behaviors for Autonomous Characters,” Reynolds uses the word “vehicle” to describe his autonomous agents, so I will follow suit.
## Why Vehicle?
In 1986, Italian neuroscientist and cyberneticist Valentino Braitenberg described a series of hypothetical vehicles with simple internal structures in his book *Vehicles: Experiments in Synthetic Psychology*. Braitenberg argues that his extraordinarily simple mechanical vehicles manifest behaviors such as fear, aggression, love, foresight, and optimism. Reynolds took his inspiration from Braitenberg, and I’ll take mine from Reynolds.
Reynolds describes the motion of *idealized* vehicles (idealized because he was not concerned with the actual engineering of such vehicles, but rather started with the assumption that they work and respond to the rules defined) as a series of three layers—**Action Selection**, **Steering**, and **Locomotion**.
Action Selection. A vehicle has a goal (or goals) and can select an action (or a combination of actions) based on that goal. This is essentially where I left off the discussion of autonomous agents. The vehicle takes a look at its environment and calculates an action based on a desire: “I see a zombie marching towards me. Since I don’t want my brains to be eaten, I’m going to flee from the zombie.” The goal is to keep one’s brains and the action is to flee. Reynolds’s paper describes many goals and associated actions such as: seek a target, avoid an obstacle, and follow a path. In a moment, I’ll start building these examples out with p5.js code.
Steering. Once an action has been selected, the vehicle has to calculate its next move. That next move will be a force; more specifically, a steering force. Luckily, Reynolds has developed a simple steering force formula that I’ll use throughout the examples in this chapter: steering force = desired velocity - current velocity. I’ll get into the details of this formula and why it works so effectively in the next section.
Locomotion. For the most part, I’m going to ignore this third layer. In the case of fleeing zombies, the locomotion could be described as “left foot, right foot, left foot, right foot, as fast as you can.” In a p5 canvas, however, a rectangle or circle or triangle’s actual movement across a window is irrelevant given that it’s all an illusion in the first place. Nevertheless, this isn’t to say that you should ignore locomotion entirely. You will find great value in thinking about the locomotive design of your vehicle and how you choose to animate it. The examples in this chapter will remain visually bare, and a good exercise would be to elaborate on the animation style —could you add spinning wheels or oscillating paddles or shuffling legs?
Ultimately, the most important layer for you to consider is #1—*Action Selection*. What are the elements of your system and what are their goals? In this chapter, I am going to cover a series of steering behaviors (i.e. actions): seek, flee, follow a path, follow a flow field, flock with your neighbors, etc. It’s important to realize, however, that the point of understanding how to write the code for these behaviors is not because you should use them in all of your projects. Rather, these are a set of building blocks, a foundation from which you can design and develop vehicles with creative goals and new and exciting behaviors. And even though the examples will be highly literal in this chapter (follow that pixel!), you should allow yourself to think more abstractly (like Braitenberg). What would it mean for your vehicle to have “love” or “fear” as its goal, its driving force? Finally (and I’ll address this later in the chapter), you won’t get very far by developing simulations with only one action. Yes, the first example will be “seek a target.” But for you to be creative—to make these steering behaviors *your own*—it will all come down to mixing and matching multiple actions within the same vehicle. So view these examples not as singular behaviors to be emulated, but as pieces of a larger puzzle that you will eventually assemble.
## 6.3 The Steering Force
I could entertain you by discussing the theoretical principles behind autonomous agents and steering as much as you like, but we won’t get anywhere without first understanding the concept of a steering force. Consider the following scenario: a vehicle moving with velocity desires to seek a target.

Figure 6.1
Its goal and subsequent action is to seek the target in Figure 6.1. If you think back to Chapter 2, you might begin by making the target an attractor and apply a gravitational force that pulls the vehicle to the target. This would be a perfectly reasonable solution, but conceptually it’s not what I’m looking for here. I don’t want to simply calculate a force that pushes the vehicle towards its target; rather, I would like to ask the vehicle to make an intelligent decision to steer towards the target based on its perception of its state and environment (i.e. how fast and in what direction is it currently moving). The vehicle should look at how it desires to move (a vector pointing to the target), compare that goal with how it is currently moving (its velocity), and apply a force accordingly.
***steering force = desired velocity - current velocity***
Or as you might write in p5:

 ``` 
let steer = p5.Vector.sub(desired, velocity);
 ``` 

In the above formula, velocity is not a problem. After all, there is already a variable for that. However, the *desired velocity* is something that has to be calculated. Take a look at Figure 6.2. If the vehicle’s goal is defined as “seeking the target,” then its desired velocity is a vector that points from its current position to the target position.

Figure 6.2
Assuming a p5.Vector target, I then have:

 ``` 
let desired = p5.Vector.sub(target, position);
 ``` 

But this there is more to the story here. What if the canvas is high-resolution and the target is thousands of pixels away? Sure, the vehicle might desire to teleport itself instantly to the target position with a massive velocity, but this won’t make for an effective animation. I’ll restate the desire as follows:
*The vehicle desires to move towards the target at maximum speed.*
In other words, the vector should point from position to target with a magnitude equal to maximum speed (i.e. the fastest the vehicle can go). So first, I’ll need to make sure to add a property to the Vehicle class for maximum speed itself.

 ``` 
class Vehicle {

  constructor(){
    this.position = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();
    // Maximum speed
    this.maxspeed = ????;
  }

 ``` 

Then, in the desired velocity calculation, I’ll scale according to maximum speed.

 ``` 
let desired = p5.Vector.sub(target, this.position);
desired.normalize();
desired.mult(this.maxspeed);
 ``` 


Figure 6.3
Putting this all together, I can now write a function called seek() that receives a p5.Vector target and calculates a steering force towards that target.

 ``` 
  seek(target) {
    let desired = p5.Vector.sub(target,this.position);
    desired.normalize();
    //{!1} Calculating the desired velocity
    // to target at max speed
    desired.mult(this.maxspeed);

    // Reynolds’s formula for steering force
    let steer = p5.Vector.sub(desired, this.velocity);
    //{!1} Using the physics model and applying the force
    // to the object’s acceleration
    this.applyForce(steer);
  }
 ``` 

Note how in the above function I finish by passing the steering force into applyForce(). This assumes that the the code is built on top of the foundation built in [Chapter 2](about:blank#chapter02_section2)
Chapter 2. However, you could just as easily use the steering force with Box2D’s applyForce() function or toxiclibs’ addForce() function.
So why does this all work so well? Let’s see what the steering force looks like relative to the vehicle and target positions.

Figure 6.4
Again, notice how this is not at all the same force as gravitational attraction. Remember one of the principles of autonomous agents: An autonomous agent has a *limited* ability to perceive its environment. Here is that ability, subtly embedded into Reynolds’s steering formula. If the vehicle weren’t moving at all (zero velocity), desired minus velocity would be equal to desired. But this is not the case. The vehicle is aware of its own velocity and its steering force compensates accordingly. This creates a more active simulation, as the way in which the vehicle moves towards the targets depends on the way it is moving in the first place.
In all of this excitement, however, I’ve missed one last step. What sort of vehicle is this? Is it a super sleek race car with amazing handling? Or a large city bus that needs a lot of advance notice to turn? A graceful panda, or a lumbering elephant? The example code, as it stands, has no feature to account for this variability in steering ability. Steering ability can be controlled by limiting the magnitude of the steering force. Let’s call that limit the “maximum force” (or maxforce for short). And so finally:

 ``` 
class Vehicle {

  constructor(){
    this.position = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();
    // Maximum speed
    this.maxspeed = ????;
    // Now also have maximum force.
    this.maxforce = ????;
  }

 ``` 

followed by:

 ``` 
  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);

    //{!1} Limit the magnitude of the steering force.
    steer.limit(this.maxforce);

    this.applyForce(steer);
  }
 ``` 

Limiting the steering force brings up an important point. Remember, it’s not actually the goal here to get the vehicle to the target as fast as possible. If that were the case, I would just say “position equals target” and there the vehicle would be. The goal, as Reynolds puts it, is to move the vehicle in a “lifelike and improvisational manner.” I’m trying to make it appear as if the vehicle is steering its way to the target, and so it’s up to me to play with the forces and variables of the system to simulate a given behavior. For example, a large maximum steering force would result in a very different path than a small one. One is not inherently better or worse than the other; it depends on the desired effect. (And of course, these values need not be fixed and could change based on other conditions. Perhaps a vehicle has health: the higher the health, the better it can steer.)

Figure 6.5
Here is the full Vehicle class, incorporating the rest of the elements from the Chapter 2 Mover object.

**Example 6.1: Seeking a target**

 ``` 
class Vehicle {
  constructor(x, y){
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x,y);
    //{!1} Additional variable for size
    this.r = 3.0;
    //{!2} Arbitrary values for maxspeed and
    // force; try varying these!
    this.maxforce = 4;
    this.maxspeed = 0.1;
    //[end]
  }

  // The standard “Euler integration” motion model
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // Newton’s second law; we could divide by mass if we wanted.
  applyForce(force) {
    this.acceleration.add(force);
  }

  // The seek steering force algorithm
  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxspeed);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  display() {
    //{!1} Vehicle is a triangle pointing in
    // the direction of velocity; since it is drawn
    // pointing up, rotate it an additional 90 degrees.
    let theta = this.velocity.heading() + PI/2;
    fill(175);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}
 ``` 

### Exercise 6.1
Implement a “fleeing” steering behavior (desired velocity is the same as “seek” but pointed in the opposite direction).
### Exercise 6.2
Implement seeking a moving target, often referred to as “pursuit.” In this case, your desired vector won’t point towards the object’s current position, but rather its “future” position as extrapolated from its current velocity. You’ll see this ability for a vehicle to “predict the future” in later examples.
### Exercise 6.3
Create a sketch where a vehicle’s maximum force and maximum speed do not remain constant, but vary according to environmental factors.
## 6.4 Arriving Behavior
After working for a bit with the seeking behavior, you probably are asking yourself, “What if I want my vehicle to slow down as it approaches the target?” Before I can even begin to answer this question, I should look at the reasons behind why the seek behavior causes the vehicle to fly past the target so that it has to turn around and go back. Let’s consider the brain of a seeking vehicle. What is it thinking?
Frame 1: I want to go as fast as possible towards the target!
Frame 2: I want to go as fast as possible towards the target!
Frame 3: I want to go as fast as possible towards the target!
Frame 4: I want to go as fast as possible towards the target!
Frame 5: I want to go as fast as possible towards the target!
etc.
The vehicle is so gosh darn excited about getting to the target that it doesn’t bother to make any intelligent decisions about its speed relative to the target’s proximity. Whether it’s far away or very close, it always wants to go as fast as possible.

Figure 6.6
In some cases, this is the desired behavior (if a missile is flying at a target, it should always travel at maximum speed.) However, in many other cases (a car pulling into a parking spot, a bee landing on a flower), the vehicle’s thought process needs to consider its speed relative to the distance from its target. For example:
Frame 1: I’m very far away. I want to go as fast as possible towards the target!
Frame 2: I’m very far away. I want to go as fast as possible towards the target!
Frame 3: I’m somewhat far away. I want to go as fast as possible towards the target!
Frame 4: I’m getting close. I want to go more slowly towards the target!
Frame 5: I’m almost there. I want to go very slowly towards the target!
Frame 6: I’m there. I want to stop!

Figure 6.7
How can you implement this “arriving” behavior in code? Let’s return to the seek() function and find the line of code which sets the magnitude of the desired velocity.

 ``` 
   let desired = p5.Vector.sub(target, this.position);
   desired.setMag(this.maxspeed);
 ``` 

In Example 6.1, the magnitude of the desired vector is always “maximum speed.”

Figure 6.8
What if instead the desired velocity's magnitude were equal to half the distance?

Figure 6.9

 ``` 
   let desired = p5.Vector.sub(target, this.position);
   desired.div(2);
 ``` 

While this nicely demonstrates the goal of a desired speed tied to the distance from the target, it’s not a particularly good solution. After all, 10 pixels away is rather close and a desired speed of 5 is rather large. Something like a desired velocity with a magnitude of 5% of the distance might work much better.

 ``` 
  let desired = p5.Vector.sub(target, this.position);
  desired.mult(0.05);
 ``` 

Reynolds describes an even more sophisticated approach. Imagine a circle around the target with a given radius. If the vehicle is within that circle, it slows down—at the edge of the circle, its desired speed is maximum speed, and at the target itself, its desired speed is 0.

Figure 6.10
In other words, if the distance from the target is less than r, the desired speed is between 0 and maximum speed mapped according to that distance.

**Example 6.2: Arrive steering behavior**

 ``` 
  arrive(target) {
    let desired = p5.Vector.sub(target, this.position);

    //{!1} The distance is the magnitude of
    // the vector pointing from
    // position to target.
    let d = desired.mag();
    //{!1} If we are closer than 100 pixels...
    if (d < 100) {
      //{!2} ...set the magnitude
      // according to how close we are.
      let m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      //{!1} Otherwise, proceed at maximum speed.
      desired.setMag(this.maxspeed);
    }

    //{!1} The usual steering = desired - velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
 ``` 

The arrive behavior is a great demonstration of the magic of “desired minus velocity.” Let’s examine this model again relative to how forces were calculated in Chapter 2. In the “gravitational attraction” example, the force always pointed directly from the object to the target (the exact direction of the desired velocity).
The steering function, however, says: “I have the ability to perceive the environment.” The force isn’t based on just the desired velocity, but on the desired velocity relative to the current velocity. Only things that are alive can know their current velocity. A box falling off a table doesn’t know it’s falling. A cheetah chasing its prey, however, knows it is chasing.
The steering force, therefore, is essentially a manifestation of the current velocity’s ***error***: "I’m supposed to be going this fast in this direction, but I’m actually going this fast in another direction. My error is the difference between where I want to go and where I am currently going." Taking that error and applying it as a steering force results in more dynamic, lifelike simulations. With gravitational attraction, you would never have a force pointing away from the target, no matter how close. But with arriving via steering, if you are moving too fast towards the target, the error would actually tell you to slow down!

Figure 6.11
