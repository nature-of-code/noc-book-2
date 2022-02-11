#  Chapter 1. Vectors 
> “Roger, Roger. What’s our vector, Victor?”
Captain Oveur (Airplane) 

 This book is all about looking at the world around us and coming up with
clever ways to simulate that world with code. Divided into three parts, the
book will start by looking at basic physics—how an apple falls from a tree,
a pendulum swings in the air, the earth revolves around the sun, etc.
Absolutely everything contained within the six chapters of this book
requires the use of the most basic building block for programming motion—the
 *** vector *** . And so this is where we begin our story. 

 Now, the word vector can mean a lot of different things. Vector is the name
of a New Wave rock band formed in Sacramento, CA in the early 1980s. It’s
the name of a breakfast cereal manufactured by Kellogg’s Canada. In the
field of epidemiology, a vector is used to describe an organism that
transmits infection from one host to another. In the C++ programming
language, a vector (std::vector) is an implementation of a dynamically
resizable array data structure. While all these definitions are interesting,
they’re not what we’re looking for. What I want to focus on is a
 *** Euclidean vector ***  (named for the Greek
mathematician Euclid and also known as a geometric vector). When you see the
term “vector” in this book, you can assume it refers to a Euclidean vector,
defined as  * an entity that has both magnitude and direction * . 

 A vector is typically drawn as a arrow; the direction is indicated by where
the arrow is pointing, and the magnitude by the length of the arrow itself. 
!( context/noc_html/imgs/chapter01/ch01_01.png))

 In the above illustration, the vector is drawn as an arrow from point A to
point B and serves as an instruction for how to travel from A to B. 

##  1.1 Vectors, You Complete Me 
 Before we dive into more of the details about vectors, I’d like to create a
basic p5.js example that demonstrates why you should care about
vectors in the first place. If you’ve read any of the introductory
p5.js textbooks or taken an introduction to creative coding course (and
hopefully you’ve done one of these things to help prepare you for this
book), you probably, at one point or another, learned how to write a
simple bouncing ball sketch. 
!( context/noc_html/imgs/chapter01/ch01_ex01.png))
###  Example 1.1: Bouncing ball with no vectors 

``` // Variables for position and speed of ball.

let x = 100;

let y = 100;

let xspeed = 1;

let yspeed = 3.3;

//{!4} Remember how p5 works? setup() is executed once when the sketch starts and draw() loops forever and ever (until you quit).

function setup() {

createCanvas(640, 360);

background(255);

}

function draw() {

background(255);

// Move the ball according to its speed.

x = x + xspeed;

y = y + yspeed;

//{!6} Check for bouncing.

if ((x > width)  || (x < 0)) {

xspeed = xspeed * -1;

}

if ((y > height) || (y < 0)) {

yspeed = yspeed * -1;

}

stroke(0);

fill(175);

//{!1} Display the ball at the position (x,y).

ellipse(x, y, 16, 16);

} ```

 In the above example, there is a very simple world—a blank canvas with a
circular shape (a “ball”) traveling around. This ball has some properties,
which are represented in the code as variables. 
``` Location ``````     x and y

 `````` Speed        `````` xspeed and yspeed ```
 In a more advanced sketch, we could imagine having many more variables: 

``` Location ``````     x and y

 `````` Speed        `````` xspeed and yspeed

 `````` Location ``````     x and y

 `````` Speed        `````` xspeed and yspeed

 `````` Location ``````     x and y

 `````` Speed        `````` xspeed and yspeed ```

 It’s becoming clearer that for every concept in this world (wind, location, acceleration, etc.), we’ll need two variables. And this is only a two-dimensional world. In a 3D world, we’ll need   x, y, z, xspeed, yspeed, zspeed,   and so on. 
 Wouldn’t it be nice if we could simplify our code and use fewer variables? 
 Instead of: 
``` float x;
float y;
float xspeed;
float yspeed; ```
``` Vector location;
Vector speed; ```

 Taking this first step in using vectors won’t allow us to do anything new. Just adding vectors won’t magically make your Processing sketches simulate physics. However, they will simplify your code and provide a set of functions for common mathematical operations that happen over and over and over again while programming motion. 
 As an introduction to vectors, we’re going to live in two dimensions for quite some time (at least until we get through the first several chapters). All of these examples can be fairly easily extended to three dimensions (and the class we will use—PVector—allows for three dimensions.) However, it’s easier to start with just two 
###  1.2 Vectors for Processing Programmers 
$$ w→=u→+v→ $$