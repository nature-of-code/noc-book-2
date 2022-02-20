# Chapter 7. Cellular Automata
“To play life you must have a fairly large checkerboard and a plentiful supply of flat counters of two colors. It is possible to work with pencil and graph paper but it is much easier, particularly for beginners, to use counters and a board.”  — Martin Gardner,
In this chapter, we’re going to take a break from talking about vectors and motion. In fact, the rest of the book will mostly focus on systems and algorithms (albeit ones that we can, should, and will apply to moving bodies). In the previous chapter, we encountered our first p5.js example of a complex system: flocking. We briefly stated the core principles behind complex systems: more than the sum of its parts, a complex system is a system of elements, operating in parallel, with short-range relationships that as a whole exhibit emergent behavior. This entire chapter is going to be dedicated to building another complex system simulation in p5.js. Oddly, we are going to take some steps backward and simplify the elements of our system. No longer are the individual elements going to be members of a physics world; instead we will build a system out of the simplest digital element possible, a single bit. This bit is going to be called a cell and its value (0 or 1) will be called its state. Working with such simple elements will help us understand more of the details behind how complex systems work, and we’ll also be able to elaborate on some programming techniques that we can apply to code-based projects.
## 7.1 What Is a Cellular Automaton?
First, let’s get one thing straight. The term ***cellular automata*** is plural. Our code examples will simulate just one—a ***cellular automaton***, singular. To simplify our lives, we’ll also refer to cellular automata as “CA.”
In Chapters 1 through 6, our objects (mover, particle, vehicle, boid) generally existed in only one “state.” They might have moved around with advanced behaviors and physics, but ultimately they remained the same type of object over the course of their digital lifetime. We’ve alluded to the possibility that these entities can change over time (for example, the weights of steering “desires” can vary), but we haven’t fully put this into practice. In this context, cellular automata make a great first step in building a system of many objects that have varying states over time.
A cellular automaton is a model of a system of “cell” objects with the following characteristics.
The cells live on a grid. (We’ll see examples in both one and two dimensions in this chapter, though a cellular automaton can exist in any finite number of dimensions.)
Each cell has a state. The number of state possibilities is typically finite. The simplest example has the two possibilities of 1 and 0 (otherwise referred to as “on” and “off” or “alive” and “dead”).
Each cell has a neighborhood. This can be defined in any number of ways, but it is typically a list of adjacent cells.

Figure 7.1
The development of cellular automata systems is typically attributed to Stanisław Ulam and John von Neumann, who were both researchers at the Los Alamos National Laboratory in New Mexico in the 1940s. Ulam was studying the growth of crystals and von Neumann was imagining a world of self-replicating robots. That’s right, robots that build copies of themselves. Once we see some examples of CA visualized, it’ll be clear how one might imagine modeling crystal growth; the robots idea is perhaps less obvious. Consider the design of a robot as a pattern on a grid of cells (think of filling in some squares on a piece of graph paper). Now consider a set of simple rules that would allow that pattern to create copies of itself on that grid. This is essentially the process of a CA that exhibits behavior similar to biological reproduction and evolution. (Incidentally, von Neumann’s cells had twenty-nine possible states.) Von Neumann’s work in self-replication and CA is conceptually similar to what is probably the most famous cellular automaton: the “Game of Life,” which we will discuss in detail in section 7.6.
Perhaps the most significant scientific (and lengthy) work studying cellular automata arrived in 2002: Stephen Wolfram’s 1,280-page [A New Kind of Science](http://www.wolframscience.com/nksonline/toc.html)
*A New Kind of Science*. Available in its entirety for free online, Wolfram’s book discusses how CA are not simply neat tricks, but are relevant to the study of biology, chemistry, physics, and all branches of science. This chapter will barely scratch the surface of the theories Wolfram outlines (we will focus on the code implementation) so if the examples provided spark your curiosity, you’ll find plenty more to read about in his book.
## 7.2 Elementary Cellular Automata
The examples in this chapter will begin with a simulation of Wolfram’s work. To understand Wolfram’s elementary CA, we should ask ourselves the question: “What is the simplest cellular automaton we can imagine?” What’s exciting about this question and its answer is that even with the simplest CA imaginable, we will see the properties of complex systems at work.
Let’s build Wolfram’s elementary CA from scratch. Concepts first, then code. What are the three key elements of a CA?
1) ***Grid***. The simplest grid would be one-dimensional: a line of cells.

Figure 7.2
2) ***States***. The simplest set of states (beyond having only one state) would be two states: 0 or 1.

Figure 7.3
3) ***Neighborhood***. The simplest neighborhood in one dimension for any given cell would be the cell itself and its two adjacent neighbors: one to the left and one to the right.

Figure 7.4: A neighborhood is three cells.
So we begin with a line of cells, each with an initial state (let’s say it is random), and each with two neighbors. We’ll have to figure out what we want to do with the cells on the edges (since those have only one neighbor each), but this is something we can sort out later.

Figure 7.5: The edge cell only has a neighborhood of two.
We haven’t yet discussed, however, what is perhaps the most important detail of how cellular automata work—*time*. We’re not really talking about real-world time here, but about the CA living over a period of *time*, which could also be called a ***generation*** and, in our case, will likely refer to the ***frame count*** of an animation. The figures above show us the CA at time equals 0 or generation 0. The questions we have to ask ourselves are: *How do we compute the states for all cells at generation 1? And generation 2?* And so on and so forth.

Figure 7.6
Let’s say we have an individual cell in the CA, and let’s call it CELL. The formula for calculating CELL’s state at any given time t is as follows:
CELL state at time t = f(CELL neighborhood at time t - 1)
In other words, a cell’s new state is a function of all the states in the cell’s neighborhood at the previous moment in time (or during the previous generation). We calculate a new state value by looking at all the previous neighbor states.

Figure 7.7
Now, in the world of cellular automata, there are many ways we could compute a cell’s state from a group of cells. Consider blurring an image. (Guess what? Image processing works with CA-like rules.) A pixel’s new state (i.e. its color) is the average of all of its neighbors’ colors. We could also say that a cell’s new state is the sum of all of its neighbors’ states. With Wolfram’s elementary CA, however, we can actually do something a bit simpler and seemingly absurd: We can look at all the possible configurations of a cell and its neighbor and define the state outcome for every possible configuration. It seems ridiculous—wouldn’t there be way too many possibilities for this to be practical? Let’s give it a try.
We have three cells, each with a state of 0 or 1. How many possible ways can we configure the states? If you love binary, you’ll notice that three cells define a 3-bit number, and how high can you count with 3 bits? Up to 8. Let’s have a look.

Figure 7.8
Once we have defined all the possible neighborhoods, we need to define an outcome (new state value: 0 or 1) for each neighborhood configuration.

Figure 7.9
The standard Wolfram model is to start generation 0 with all cells having a state of 0 except for the middle cell, which should have a state of 1.

Figure 7.10
Referring to the ruleset above, let’s see how a given cell (we’ll pick the center one) would change from generation 0 to generation 1.

Figure 7.11
Try applying the same logic to all of the cells above and fill in the empty cells.
Now, let’s go past just one generation and color the cells —0 means white, 1 means black—and stack the generations, with each new generation appearing below the previous one.

Figure 7.12: Rule 90
The low-resolution shape we’re seeing above is the “Sierpiński triangle.” Named after the Polish mathematician Wacław Sierpiński, it’s a fractal pattern that we’ll examine in the next chapter. That’s right: this incredibly simple system of 0s and 1s, with little neighborhoods of three cells, can generate a shape as sophisticated and detailed as the Sierpiński triangle. Let’s look at it again, only with each cell a single pixel wide so that the resolution is much higher.

Figure 7.13: Rule 90
This particular result didn’t happen by accident. I picked this set of rules because of the pattern it generates. Take a look at Figure 7.8 one more time. Notice how there are eight possible neighborhood configurations; we therefore define a “ruleset” as a list of 8 bits.
So this particular rule can be illustrated as follows:

Figure 7.14: Rule 90
Eight 0s and 1s means an 8-bit number. How many combinations of eight 0s and 1s are there? 256. This is just like how we define the components of an RGB color. We get 8 bits for red, green, and blue, meaning we make colors with values from 0 to 255 (256 possibilities).
In terms of a Wolfram elementary CA, we have now discovered that there are 256 possible rulesets. The above ruleset is commonly referred to as “Rule 90” because if you convert the binary sequence—01011010—to a decimal number, you’ll get the integer 90. Let’s try looking at the results of another ruleset.

Figure 7.15: Rule 222

Figure 7.16: A Textile Cone Snail (Conus textile), Cod Hole, Great Barrier Reef, Australia, 7 August 2005. Photographer: Richard Ling richard@research.canon.com.au
As we can now see, the simple act of creating a CA and defining a ruleset does not guarantee visually interesting results. Out of all 256 rulesets, only a handful produce compelling outcomes. However, it’s quite incredible that even one of these rulesets for a one-dimensional CA with only two possible states can produce the patterns we see every day in nature (see Figure 7.16), and it demonstrates how valuable these systems can be in simulation and pattern generation.
Before we go too far down the road of how Wolfram classifies the results of varying rulesets, let’s look at how we actually build a p5.js sketch that generates the Wolfram CA and visualizes it onscreen.
## 7.3 How to Program an Elementary CA
You may be thinking: “OK, I’ve got this cell thing. And the cell thing has some properties, like a state, what generation it’s on, who its neighbors are, where it lives pixel-wise on the screen. And maybe it has some functions: it can display itself, it can generate its new state, etc.” This line of thinking is an excellent one and would likely lead you to write some code like this:

 ``` 
class Cell {

}
 ``` 

This line of thinking, however, is not the road we will first travel. Later in this chapter, we will discuss why an object-oriented approach could prove valuable in developing a CA simulation, but to begin, we can work with a more elementary data structure. After all, what is an elementary CA but a list of 0s and 1s? Certainly, we could describe the following CA generation using an array:

Figure 7.17

 ``` 
let cells = [1,0,1,0,0,0,0,1,0,1,1,1,0,0,0,1,1,1,0,0];
 ``` 

To draw that array, we simply check if we’ve got a 0 or a 1 and create a fill accordingly.

 ``` 
//{!1} Loop through every cell.
for (let i = 0; i < cells.length; i++) {
    //{!5} Create a fill based on its state (0 or 1).
  if (cells[i] == 0) {
        fill(255);
    } else {
        fill(0);
    }
  stroke(0);
  rect(i*50, 0, 50, 50);
}
 ``` 

Now that we have the array to describe the cell states of a given generation (which we’ll ultimately consider the “current” generation), we need a mechanism by which to compute the next generation. Let’s think about the pseudocode of what we are doing at the moment.
**For every cell in the array:**
Take a look at the neighborhood states: left, middle, right.
Look up the new value for the cell state according to some ruleset.
Set the cell’s state to that new value.
This may lead you to write some code like this:

 ``` 
// For every cell in the array...
for (let i = 0; i < cells.length; i++) {

  //{!3} ...take a look at the neighborhood.
  let left   = cells[i-1];
  let middle = cells[i];
  let right  = cells[i+1];

  //{!1} Look up the new value according to the rules.
  let newstate = rules(left,middle,right);

  //{!1} Set the cell’s state to the new value.
  cells[i] = newstate;
}
 ``` 

We’re fairly close to getting this right, but we’ve made one minor blunder and one major blunder in the above code. Let’s talk about what we’ve done well so far.
Notice how easy it is to look at a cell’s neighbors. Because an array is an ordered list of data, we can use the fact that the indices are numbered to know which cells are next to which cells. We know that cell number 15, for example, has cell 14 to its left and 16 to its right. More generally, we can say that for any cell i, its neighbors are i-1 and i+1.
We’re also farming out the calculation of a new state value to some function called rules(). Obviously, we’re going to have to write this function ourselves, but the point we’re making here is modularity. We have a basic framework for the CA in this function, and if we later want to change how the rules operate, we don’t have to touch that framework; we can simply rewrite the rules() function to compute the new states differently.
So what have we done wrong? Let’s talk through how the code will execute. First, we look at cell index i equals 0. Now let’s look at 0’s neighbors. Left is index -1. Middle is index 0. And right is index 1. However, our array by definition does not have an element with the index -1. It starts with 0. This is a problem we’ve alluded to before: the edge cases.
How do we deal with the cells on the edge who don’t have a neighbor to both their left and their right? Here are three possible solutions to this problem:
Edges remain constant. This is perhaps the simplest solution. We never bother to evaluate the edges and always leave their state value constant (0 or 1).
Edges wrap around. Think of the CA as a strip of paper and turn that strip of paper into a ring. The cell on the left edge is a neighbor of the cell on the right and vice versa. This can create the appearance of an infinite grid and is probably the most used solution.
Edges have different neighborhoods and rules. If we wanted to, we could treat the edge cells differently and create rules for cells that have a neighborhood of two instead of three. You may want to do this in some circumstances, but in our case, it’s going to be a lot of extra lines of code for little benefit.
To make the code easiest to read and understand right now, we’ll go with option #1 and just skip the edge cases, leaving their values constant. This can be accomplished by starting the loop one cell later and ending one cell earlier:

 ``` 
//{.bold} A loop that ignores the first and last cell
for (let i = 1; i < cells.length-1; i++) {
  let left   = cells[i-1];
  let middle = cells[i];
  let right  = cells[i+1];
  let newstate = rules(left, middle, right);
  cells[i] = newstate;
}
 ``` 

There’s one more problem we have to fix before we’re done. It’s subtle and you won’t get a compilation error; the CA just won’t perform correctly. However, identifying this problem is absolutely fundamental to the techniques behind programming CA simulations. It all lies in this line of code:

 ``` 
  cells[i] = newstate;
 ``` 

This seems like a perfectly innocent line. After all, we’ve computed the new state value and we’re simply giving the cell its new state. But in the next iteration, you’ll discover a massive bug. Let’s say we’ve just computed the new state for cell #5. What do we do next? We calculate the new state value for cell #6.
*Cell #6, generation 0 = some state, 0 or 1**Cell #6, generation 1 = a function of states for ****cell #5****, cell #6, and cell #7 at *generation 0**
Notice how we need the value of cell #5 at generation 0 in order to calculate cell #6’s new state at generation 1? A cell’s new state is a function of the previous neighbor states. Do we know cell #5’s value at generation 0? Remember, p5.js just executes this line of code for *i = 5*.
