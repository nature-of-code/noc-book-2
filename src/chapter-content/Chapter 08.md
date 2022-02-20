# Chapter 8. Fractals
“Pathological monsters! cried the terrified mathematician
Once upon a time, I took a course in high school called “Geometry.” Perhaps you did too. You learned about shapes in one dimension, two dimensions, and maybe even three. What is the circumference of a circle? The area of a rectangle? The distance between a point and a line? Come to think of it, we’ve been studying geometry all along in this book, using vectors to describe the motion of bodies in Cartesian space. This sort of geometry is generally referred to as Euclidean geometry, after the Greek mathematician Euclid.

Figure 8.1
For us nature coders, we have to ask the question: Can we describe our world with Euclidean geometry? The LCD screen I’m staring at right now sure looks like a rectangle. And the plum I ate this morning is circular. But what if I were to look further, and consider the trees that line the street, the leaves that hang off those trees, the lightning from last night’s thunderstorm, the cauliflower I ate for dinner, the blood vessels in my body, and the mountains and coastlines that cover land beyond New York City? Most of the stuff you find in nature cannot be described by the idealized geometrical forms of Euclidean geometry. So if we want to start building computational designs with patterns beyond the simple shapes ellipse(), rect(), and line(), it’s time for us to learn about the concepts behind and techniques for simulating the geometry of nature: fractals.
## 8.1 What Is a Fractal?
The term ***fractal*** (from the Latin *fractus*, meaning “broken”) was coined by the mathematician Benoit Mandelbrot in 1975. In his seminal work “The Fractal Geometry of Nature,” he defines a fractal as “a rough or fragmented geometric shape that can be split into parts, each of which is (at least approximately) a reduced-size copy of the whole.”

Figure 8.2: One of the most well-known and recognizable fractal patterns is named for Benoit Mandelbrot himself. Generating the Mandelbrot set involves testing the properties of complex numbers after they are passed through an iterative function. Do they tend to infinity? Do they stay bounded? While a fascinating mathematical discussion, this “escape-time” algorithm is a less practical method for generating fractals than the recursive techniques we’ll examine in this chapter. However, an example for generating the Mandelbrot set is included in the code examples.
Let’s illustrate this definition with two simple examples. First, let’s think about a tree branching structure (for which we’ll write the code later):

Figure 8.3
Notice how the tree in Figure 8.3 has a single root with two branches connected at its end. Each one of those branches has two branches at its end and those branches have two branches and so on and so forth. What if we were to pluck one branch from the tree and examine it on its own?

Figure 8.4
Looking closely at a given section of the tree, we find that the shape of this branch resembles the tree itself. This is known as ***self-similarity***; as Mandelbrot stated, each part is a “reduced-size copy of the whole.”
The above tree is perfectly symmetrical and the parts are, in fact, exact replicas of the whole. However, fractals do not have to be perfectly self-similar. Let’s take a look at a graph of the stock market (adapted from actual Apple stock data).

Figure 8.5: Graph A
And one more.

Figure 8.6: Graph B
In these graphs, the x-axis is time and the y-axis is the stock’s value. It’s not an accident that I omitted the labels, however. Graphs of stock market data are examples of fractals because they look the same at any scale. Are these graphs of the stock over one year? One day? One hour? There’s no way for you to know without a label. (Incidentally, graph A shows six months’ worth of data and graph B zooms into a tiny part of graph A, showing six hours.)

Figure 8.7
This is an example of a ***stochastic*** fractal, meaning that it is built out of probabilities and randomness. Unlike the deterministic tree-branching structure, it is statistically self-similar. As we go through the examples in this chapter, we will look at both deterministic and stochastic techniques for generating fractal patterns.
While self-similarity is a key trait of fractals, it’s important to realize that self-similarity alone does not make a fractal. After all, a straight line is self-similar. A straight line looks the same at any scale, and can be thought of as comprising lots of little lines. But it’s not a fractal. Fractals are characterized by having a fine structure at small scales (keep zooming into the stock market graph and you’ll continue to find fluctuations) and cannot be described with Euclidean geometry. If you can say “It’s a line!” then it’s not a fractal.
Another fundamental component of fractal geometry is recursion. Fractals all have a recursive definition. We’ll start with recursion before developing techniques and code examples for building fractal patterns in p5.js.
## 8.2 Recursion
Let’s begin our discussion of recursion by examining the first appearance of fractals in modern mathematics. In 1883, German mathematician George Cantor developed simple rules to generate an infinite set:

Figure 8.8: The Cantor set
There is a feedback loop at work here. Take a single line and break it into two. Then return to those two lines and apply the same rule, breaking each line into two, and now we’re left with four. Then return to those four lines and apply the rule. Now you’ve got eight. This process is known as ***recursion***: the repeated application of a rule to successive results. Cantor was interested in what happens when you apply these rules an infinite number of times. We, however, are working in a finite pixel space and can mostly ignore the questions and paradoxes that arise from infinite recursion. We will instead construct our code in such a way that we do not apply the rules forever (which would cause our program to freeze).
Before I implement the Cantor set, let’s take a look at what it means to have recursion in code. Here’s something you are used to doing all the time—calling a function inside another function.

 ``` 
function someFunction() {
  //{!1} Calling the function background()
  // in the definition of someFunction()
  background(0);
}
 ``` 

What would happen if you called the function you defined within the function itself? Can someFunction() call someFunction()?

 ``` 
function someFunction() {
  someFunction();
}
 ``` 

In fact, this is not only allowed, but it’s quite common (and essential to how I will implement the Cantor set). Functions that call themselves are *recursive* and good for solving certain problems. For example, certain mathematical calculations are implemented recursively; the most common example is *factorial*.
The factorial of any number n, usually written as n!, is defined as:
n! = n × (n - 1) × … × 3 × 2 × 10! = 1
Here I'll write a function in p5.js that uses a for loop to calculate factorial:

 ``` 
function factorial(n) {
  let f = 1;
  //{!3} Using a regular loop to compute factorial
  for (let i = 0; i < n; i++) {
    f = f * (i+1);
  }
  return f;
}
 ``` 

Upon close examination, you’ll notice something interesting about how factorial works. Let’s look at 4! and 3!
4! = 4 * 3 * 2 * 13! = 3 * 2 * 1
***therefore. . .***
4! = 4 * 3!
In more general terms, for any positive integer n:
n! = n * (n-1)!1! = 1
Written out:
The *factorial* of n is defined as n times the *factorial* of n-1.
The definition of ***factorial*** includes ***factorial***?! It’s kind of like defining “tired" as “the feeling you get when you are tired.” This concept of self-reference in functions is an example of recursion. And you can use it to write a factorial function that calls itself.

 ``` 
function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n-1);
  }
}
 ``` 

It may look crazy, but it works. Here are the steps that happen when factorial(4) is called.

Figure 8.9
You can apply the same principle to graphics with interesting results, as you will see in many examples throughout this chapter. Take a look at this recursive function.

**Example 8.1: Recursive Circles I**

 ``` 
function drawCircle(x, y, radius) {
  ellipse(x, y, radius);
  if(radius > 2) {
    radius *= 0.75f;
    //{!1} The drawCircle() function is
    // calling itself recursively.
    drawCircle(x, y, radius);
  }
}
 ``` 

drawCircle() draws an ellipse based on a set of parameters that it receives as arguments. It then calls itself with those same parameters, adjusting them slightly. The result is a series of circles, each of which is drawn inside the previous circle.
Notice that the above function only recursively calls itself if the radius is greater than 2. This is a crucial point. As with iteration, *all recursive functions must have an exit condition!* You likely are already aware that all for and while loops must include a Boolean expression that eventually evaluates to false, thus exiting the loop. Without one, the program would crash, caught inside of an infinite loop. The same can be said about recursion. If a recursive function calls itself forever and ever, you’ll be most likely be treated to a nice frozen screen.
This circles example is rather trivial; it could easily be achieved through simple iteration. However, for scenarios in which a function calls itself more than once, recursion becomes wonderfully elegant.
Let’s make drawCircle() a bit more complex. For every circle displayed, draw a circle half its size to the left and right of that circle.

**Example 8.2: Recursion twice**

 ``` 
function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);
  drawCircle(width/2, height/2, 200);
}

function drawCircle(x, y, radius) {
  stroke(0);
  noFill();
  ellipse(x, y, radius);
  if(radius > 2) {
    //{!2} drawCircle() calls itself twice, creating
    // a branching effect.  For every circle,
    // a smaller circle is drawn to the left and the right.
    drawCircle(x + radius/2, y, radius/2);
    drawCircle(x - radius/2, y, radius/2);
  }
}
 ``` 

With just a little more code, we could also add a circle above and below each circle.

**Example 8.3: Recursion four times**

 ``` 
function drawCircle(x, y, radius) {
  ellipse(x, y, radius);
  if(radius > 8) {
    drawCircle(x + radius/2, y, radius/2);
    drawCircle(x - radius/2, y, radius/2);
    drawCircle(x, y + radius/2, radius/2);
    drawCircle(x, y - radius/2, radius/2);
  }
}
 ``` 

Try reproducing this sketch with iteration instead of recursion—I dare you!
## 8.3 The Cantor Set with a Recursive Function
Now I'm ready to visualize the Cantor set in p5.js using a recursive function. Where do I begin? Well, I know that the Cantor set begins with a line. So I will start there and write a function that draws a line.

 ``` 
function cantor(x, y, len) {
  line(x, y, x+len, y);
}
 ``` 

The above cantor() function draws a line that starts at pixel coordinate *(x,y)* with a length of len. (The line is drawn horizontally here, but this is an arbitrary decision.) So if I called that function, saying:

 ``` 
cantor(10, 20, width-20);
 ``` 

we’d get the following:

Figure 8.10

Figure 8.11
Now, the Cantor rule tells us to erase the middle third of that line, which leaves us with two lines, one from the beginning of the line to the one-third mark, and one from the two-thirds mark to the end of the line.
We can now add two more lines of code to draw the second pair of lines, moving the y-position down a bunch of pixels so that we can see the result below the original line.

 ``` 
function cantor(x, y, len) {
  line(x,y,x+len,y);

  y += 20;
  //{.bold} From start to 1/3rd
  line(x, y, x + len / 3, y);
  //{!1 .bold} From 2/3rd to end
  line(x + len * 2/3, y, x + len, y);
}
 ``` 


Figure 8.12
While this is a fine start, such a manual approach of calling line() for each line is not what I want. It will get unwieldy very quickly, as I'd need four, then eight, then sixteen calls to line(). Yes, a for loop is the usual way around such a problem, but give that a try and you’ll see that working out the math for each iteration quickly proves inordinately complicated. Here is where recursion comes to the rescue.
Take a look at where I draw that first line from the start to the one-third mark.

 ``` 
   line(x, y, x + len / 3, y);
 ``` 

Instead of calling the line() function directly, I can simply call the cantor() function itself. After all, what does the cantor() function do? It draws a line at an *(x,y)* position with a given length! And so:

 ``` 
   line(x, y, x + len/3, y);           becomes ----> cantor(x, y, len/3);
 ``` 

And for the second line:

 ``` 
   line(x + len * 2/3, y, x + len, y); becomes ----> cantor(x + len * 2/3, y, len / 3);
 ``` 

Leaving us with:

 ``` 
function cantor(x, y, len) {
  line(x, y, x + len, y);

  y += 20;

  cantor(x, y, len/3);
  cantor(x + len * 2/3, y, len/3);
}
 ``` 

And since the cantor() function is called recursively, the same rule will be applied to the next lines and to the next and to the next as cantor() calls itself again and again! Now, don’t go and run this code yet. The sketch missing that crucial element: an exit condition. You'll want to make sure to stop at some point—for example, if the length of the line ever is less than 1 pixel.

**Example 8.4: Cantor set**

 ``` 
function cantor(x, y, len) {
  //{!1} Stop at 1 pixel!
  if (len >= 1) {
    line(x, y, x + len, y);
    y += 20;
    cantor(x, y, len/3);
    cantor(x + len * 2/3, y, len/3);
  }
}
 ``` 

