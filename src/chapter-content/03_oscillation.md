# Chapter 3. Oscillation
“Trigonometry is a sine of the times.”
In Chapters 1 and 2, I carefully worked out an object-oriented structure to make something move on the screen, using the concept of a vector to represent position, velocity, and acceleration driven by forces in the environment. I could move straight from here into topics such as particle systems, steering forces, group behaviors, etc. If I did that, however, I’d skip an important area of mathematics that you’re going to need: ***trigonometry***, or the mathematics of triangles, specifically right triangles.
Trigonometry is going to give you a lot of tools. You’ll get to think about angles and angular velocity and acceleration. Trig will teach you about the sine and cosine functions, which when used properly can yield a nice ease-in, ease-out wave pattern. It’s going to allow you to calculate more complex forces in an environment that involves angles, such as a pendulum swinging or a box sliding down an incline.
So this chapter is a bit of a mishmash. I’ll start with the basics of working with angles in p5.js and cover many trigonometric topics, tying it all into forces at the end. If I do it well, this will also pave the way for more sophisticated examples that require trig later in this book.
## 3.1 Angles
OK. Before you can do any of this stuff, I need to make sure you understand what it means to be an angle in p5.js. If you have experience with p5.js, you’ve undoubtedly encountered this issue while using the rotate() function to rotate and spin objects.
The first order of business is to cover ***radians*** and ***degrees***. You’re probably familiar with the concept of an angle in ***degrees***. A full rotation goes from 0 to 360 degrees. 90 degrees (a right angle) is 1/4th of 360, shown below as two perpendicular lines.

Figure 3.1
It’s probably more intuitive for you to think of angles in terms of degrees. For example, the square in Figure 3.2 is rotated 45 degrees around its center.

Figure 3.2
By default p5.js, however, considers angles to be specified in ***radians***. A radian is a unit of measurement for angles defined by the ratio of the length of the arc of a circle to the radius of that circle. One radian is the angle at which that ratio equals one (see Figure 3.3). 180 degrees = PI radians, 360 degrees = 2*PI radians, 90 degrees = PI/2 radians, etc.

Figure 3.3
The formula to convert from degrees to radians is:
radians = 2 * PI * (degrees / 360)
Thankfully, if you prefer to think of angles in degrees you can call angleMode(DEGREES). p5.js also includes a convenience function radians() function to automatically converts values from degrees to radians as well as the constants PI and TWO_PI for access to these commonly used numbers (equivalent to 180 and 360 degrees, respectively). Here are two ways in p5.js to rotate a shape by 60 degrees.

 ``` 
let angle = 60;
rotate(radians(angle));

angleMode(DEGREES);
rotate(angle);
 ``` 

While the above can be useful, for the purposes of this book I‘m going to always assume radians. In addition, if you are not familiar with how rotation is implemented in p5.js, I would suggest [this transformations tutorial by Gene Kogan](http://genekogan.com/code/p5js-transformations/)
this transformations tutorial by Gene Kogan or this [video series on transformations in p5.js](https://youtu.be/o9sgjuh-CBM)
video series on transformations in p5.js.
## What is PI?
The mathematical constant pi (or π) is a real number defined as the ratio of a circle’s circumference (the distance around the perimeter) to its diameter (a straight line that passes through the circle’s center). It is equal to approximately 3.14159 and can be accessed in p5 with the built-in variable PI.
### Exercise 3.1
Rotate a baton-like object (see below) around its center using translate() and rotate().

## 3.2 Angular Motion
Remember all this stuff?
velocity = velocity + accelerationposition = position + velocity
The stuff we dedicated almost all of Chapters 1 and 2 to? Well, you can apply exactly the same logic to a rotating object.
angular velocity = angular velocity + angular accelerationangle = angle + angular velocity
In fact, the above is simpler than what I started with because an angle is a *scalar* quantity—a single number, not a vector!
Using the answer from Exercise 3.1 above, let’s say you wanted to rotate a baton in p5.js by some angle. The code might read:

 ``` 
translate(width/2, height/2);
rotate(angle);
line(-50, 0, 50, 0);
circle(50, 0, 8);
circle(-50, 0, 8);
 ``` 

Adding in the principles of motion, I can then write the following example (the solution to Exercise 3.1).

**Example 3.1: Angular motion using rotate()**

 ``` 
// position
let angle = 0;
// Velocity
let aVelocity = 0;
//{!1} Acceleration
let aAcceleration = 0.001;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);

  fill(175);
  stroke(0);
  rectMode(CENTER);
  translate(width/2, height/2);
  rotate(angle);
  line(-50, 0, 50, 0);
  circle(50, 0, 8);
  circle(-50, 0, 8);

  // Angular equivalent of velocity.add(acceleration);
  aVelocity += aAcceleration;
  //{!1} Angular equivalent of position.add(velocity);
  angle += aVelocity;
}
 ``` 

The baton starts onscreen with no rotation and then spins faster and faster as the angle of rotation accelerates.
### Exercise 3.x-axis
Add an interaction to the spinning baton. How can you control the acceleration with the mouse? Can you introduce the idea of drag, decreasing the angular velocity over time so that it will always eventually come to rest?
This idea can be incorporated into the Mover class by adding new variables related to angular motion.

 ``` 
class Mover {

  constructor(){
    this.position = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();
    this.mass = 1.0;

    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;
  }

}
 ``` 

And then in update(), position and angle are updated according to the same algorithm!

 ``` 
update() {
  //{!2} Regular old-fashioned motion
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);

  //{!2} Newfangled angular motion
  this.aVelocity += this.aAcceleration;
  this.angle += this.aVelocity;

  this.acceleration.mult(0);
}
 ``` 

Of course, for any of this to matter, I also would need to rotate the object when displaying it. (I'll add drawing a line from the center to the edge of the circle so that rotation is viewabale. You could also use a shape other than a circle.)

 ``` 
display() {
  stroke(0);
  fill(175, 200);
  rectMode(CENTER);
  //{!1} push() and pop() are necessary so that the rotation of this shape doesn’t affect the rest of our world.
  push();

  // Set the origin at the shape’s position.
  translate(this.position.x, this.position.y);
  //{!1} Rotate by the angle.
  rotate(this.angle);
  circle(0, 0, this.radius * 2);
  line(0, 0, this.radius, 0);
  pop();
}
 ``` 

Now, if you were to actually go ahead and run the above code, you wouldn’t see anything new. This is because the angular acceleration (this.aAcceleration = 0;) is initialized to zero. For the object to rotate, it needs a non-zero acceleration! Certainly, one option is to hard-code a number.

 ``` 
this.aAcceleration = 0.01;
 ``` 

However, you can produce a more interesting result by dynamically assigning an angular acceleration according to forces in the environment. Now, I could head far down this road and research modeling the physics of angular acceleration based on the concepts of [torque](http://en.wikipedia.org/wiki/Torque)
torque and [moment of inertia](http://en.wikipedia.org/wiki/Moment_of_inertia)
moment of inertia. Nevertheless, this level of simulation is beyond the scope of this book. (I will cover more about modeling angular acceleration with a pendulum later in this chapter, as well as look at how other physics libraries realistically models rotational motion in Chapter 5.)
For now, a quick and dirty solution will do. I can produce reasonable results by calculating angular acceleration as a function of the object’s acceleration vector. Here’s one such example:

 ``` 
    this.aAcceleration = this.acceleration.x;
 ``` 

Yes, this is completely arbitrary. But it does do something. If the object is accelerating to the right, its angular rotation accelerates in a clockwise direction; acceleration to the left results in a counterclockwise rotation. Of course, it’s important to think about scale in this case. The *x* component of the acceleration vector might be a quantity that’s too large, causing the object to spin in a way that looks ridiculous or unrealistic. So dividing the *x* component by some value, or perhaps constraining the angular velocity to a reasonable range, could really help. Here’s the entire update() function with these tweaks added.

**Example 3.2: Forces with (arbitrary) angular motion**

 ``` 
  update() {

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    //{!1} Calculate angular acceleration according to acceleration’s horizontal direction and magnitude.
    this.aAcceleration = this.acceleration.x / 10.0;
    this.aVelocity += this.aAcceleration;
    //{!1} Use constrain() to ensure that angular velocity doesn’t spin out of control.
    this.aVelocity = constrain(this.aVelocity, -0.1, 0.1);
    this.angle += this.aVelocity;

    this.acceleration.mult(0);
  }
 ``` 

### Exercise 3.2
Step 1: Create a simulation where objects are shot out of a cannon. Each object should experience a sudden force when shot (just once) as well as gravity (always present).
Step 2: Add rotation to the object to model its spin as it is shot from the cannon. How realistic can you make it look?
## 3.3 Trigonometry
I think it may be time. I’ve discussed angles, I’ve spun a baton. It’s time for: *sohcahtoa*. Yes, *sohcahtoa*. This seemingly nonsensical word is actually the foundation for a lot of computer graphics work. A basic understanding of trigonometry is essential if you want to calculate an angle, figure out the distance between points, work with circles, arcs, or lines. And *sohcahtoa* is a mnemonic device (albeit a somewhat absurd one) for what the trigonometric functions sine, cosine, and tangent mean.

Figure 3.4
soh: sine = opposite / hypotenuse
cah: cosine = adjacent / hypotenuse
toa: tangent = opposite / adjacent

Figure 3.5
Take a look at Figure 3.4 again. There’s no need to memorize it, but make sure you feel comfortable with it. Draw it again yourself. Now let’s draw it a slightly different way (Figure 3.5).
See how a right triangle is created from a vector? The vector arrow itself is the hypotenuse and the components of the vector (x and y) are the sides of the triangle. The angle is an additional means for specifying the vector’s direction (or “heading”).
Because the trigonometric functions establish a relationship between the components of a vector and its direction + magnitude, they will prove very useful throughout this book. I’ll begin by looking at an example that requires the tangent function.
## 3.4 Pointing in the Direction of Movement
Let’s go all the way back to Example 1.10, which features a Mover object accelerating towards the mouse.

You might notice that almost all of the shapes I’ve been drawing so far are circles. This is convenient for a number of reasons, one of which is that I don’t have to consider the question of rotation. Rotate a circle and, well, it looks exactly the same. However, there comes a time in all motion programmers’ lives when they want to draw something on the screen that points in the direction of movement. Perhaps you are drawing an ant, or a car, or a spaceship. And when I say “point in the direction of movement,” what I am really saying is “rotate according to the velocity vector.” Velocity is a vector, with an x and a y component, but to rotate in p5.js you need an angles. Let’s draw the trigonometry diagram once more, this time with an object’s velocity vector (Figure 3.6).

Figure 3.6
OK. I‘ve stayed the definition of tangent is:
{tangent}({angle}) = \frac{velocity_x}{velocity_y}
The problem with the above is that while velocity is known, the angle of direction is not. I have to solve for that angle. This is where a special function known as *inverse tangent* comes in, also known to as *arctangent* or *tan**-1*. (There is also an *inverse sine* and an *inverse cosine*.)
If the tangent of some value a equals some value b, then the inverse tangent of b equals a. For example:
*if**tangent(a) = b**then**a = arctangent(b)*
See how that is the inverse? The above now allows me to solve for the angle:
*if**tangent(angle) = velocity**y** / velocity**x**then**angle = arctangent(velocity**y** / velocity**x**)*
Now that I have the formula, let’s see where it should go in the mover’s display() function. Notice that in p5.js, the function for arctangent is called atan().

 ``` 
  display() {
    //{!1} Solve for angle by using atan().
    let angle = atan(this.velocity.y / this.velocity.x);

    stroke(0);
    fill(175);
    push();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    //{!1} Rotate according to that angle.
    rotate(angle);
    rect(0, 0, 30, 10);
    pop();
  }
 ``` 

Now the above code is pretty darn close, and almost works. There is a big problem, though. Consider the two velocity vectors depicted below.

Figure 3.7
Though superficially similar, the two vectors point in quite different directions—opposite directions, in fact! However, if I were to apply the formula to solve for the angle to each vector…
V1 ⇒ angle = atan(3/-4) = atan(-0.75) = -0.6435011 radians = -37 degreesV2 ⇒ angle = atan(-3/4) = atan(-0.75) = -0.6435011 radians = -37 degrees
…I get the same angle for each vector. This can’t be right for both; the vectors point in opposite directions! The thing is, this is a pretty common problem in computer graphics. Rather than using atan() along with a bunch of conditional statements to account for positive/negative scenarios, p5.js (along with pretty much all programming environments) has a nice function called atan2() that does it for you.

**Example 3.3: Pointing in the direction of motion**

 ``` 
  display() {
    //{!1} Using atan2() to account for all possible directions
    let angle = atan2(this.velocity.y, this.velocity.x);

    stroke(0);
    fill(175);
    push();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    //{!1} Rotate according to that angle.
    rotate(angle);
    rect(0, 0, 30, 10);
    pop();
  }
 ``` 

To simplify this even further, the p5.Vector class itself provides a function called heading(), which takes care of calling atan2() for you so you can get the 2D direction angle, in radians, for any p5.Vector.

 ``` 
    // The easiest way to do this!
    let angle = this.velocity.heading();
 ``` 

### Exercise 3.3
Create a simulation of a vehicle that you can drive around the screen using the arrow keys: left arrow accelerates the car to the left, right to the right. The car should point in the direction in which it is currently moving.
## 3.5 Polar vs. Cartesian Coordinates
