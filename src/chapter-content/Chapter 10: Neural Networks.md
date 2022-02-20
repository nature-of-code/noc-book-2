# Chapter 10. Neural Networks
“You can’t process me with a normal brain.”
I began with inanimate objects living in a world of forces and gave those objects desires, autonomy, and the ability to take action according to a system of rules. Next, I allowed those objects to live in a population and evolve over time. Now I ask: What is each object’s decision-making process? How can it adjust its choices by learning over time? Can a computational entity process its environment and generate a decision?
The human brain can be described as a biological neural network—an interconnected web of neurons transmitting elaborate patterns of electrical signals. Dendrites receive input signals and, based on those inputs, fire an output signal via an axon. Or something like that. How the human brain actually works is an elaborate and complex mystery, one that I certainly am not going to attempt to tackle in rigorous detail in this chapter.

Figure 10.1
The good news is that developing engaging animated systems with code does not require scientific rigor or accuracy, as you've learned throughout this book. You can simply be inspired by the idea of brain function.
In this chapter, I'll begin with a conceptual overview of the properties and features of neural networks and build the simplest possible example of one (a network that consists of a single neuron). Afterwards, I'll examine strategies for creating a “Brain” object that can be inserted into the Vehicle class and used to determine steering. Finally, I'll introduce you to building and using neural networks in ml5.js.
## 10.1 Artificial Neural Networks: Introduction and Application
Computer scientists have long been inspired by the human brain. In 1943, Warren S. McCulloch, a neuroscientist, and Walter Pitts, a logician, developed the first conceptual model of an artificial neural network. In their paper, "A logical calculus of the ideas imminent in nervous activity,” they describe the concept of a neuron, a single cell living in a network of cells that receives inputs, processes those inputs, and generates an output.
Their work, and the work of many scientists and researchers that followed, was not meant to accurately describe how the biological brain works. Rather, an artificial neural network (which we will now simply refer to as a “neural network”) was designed as a computational model based on the brain to solve certain kinds of problems.
It’s probably pretty obvious to you that there are problems that are incredibly simple for a computer to solve, but difficult for you. Take the square root of 964,324, for example. A quick line of code produces the value 982, a number your computer computed in less than a millisecond. There are, on the other hand, problems that are incredibly simple for you or me to solve, but not so easy for a computer. Show any toddler a picture of a kitten or puppy and they’ll be able to tell you very quickly which one is which. Say “hello” and shake my hand one morning and you should be able to pick me out of a crowd of people the next day. But need a machine to perform one of these tasks? Scientists have already spent entire careers researching and implementing complex solutions.
The most common application of neural networks in computing today is to perform one of these “easy-for-a-human, difficult-for-a-machine” tasks, often referred to as pattern recognition. Applications range from optical character recognition (turning printed or handwritten scans into digital text) to facial recognition. I don’t have the time or need to use some of these more elaborate artificial intelligence algorithms here, but if you are interested in researching neural networks, I’d recommend the books *Artificial Intelligence: A Modern Approach* by Stuart J. Russell and Peter Norvig and *AI for Game Developers* by David M. Bourg and Glenn Seemann.

Figure 10.2
A neural network is a “connectionist” computational system. The computational systems I have been writing in this book are procedural; a program starts at the first line of code, executes it, and goes on to the next, following instructions in a linear fashion. A true neural network does not follow a linear path. Rather, information is processed collectively, in parallel throughout a network of nodes (the nodes, in this case, being neurons).
Here I am showing yet another example of a complex system, much like the ones I showed in Chapters 6, 7, and 8. The individual elements of the network, the neurons, are simple. They read an input, process it, and generate an output. A network of many neurons, however, can exhibit incredibly rich and intelligent behaviors.
One of the key elements of a neural network is its ability to *learn*. A neural network is not just a complex system, but a complex ***adaptive*** system, meaning it can change its internal structure based on the information flowing through it. Typically, this is achieved through the adjusting of *weights*. In the diagram above, each line represents a connection between two neurons and indicates the pathway for the flow of information. Each connection has a ***weight***, a number that controls the signal between the two neurons. If the network generates a “good” output (which I'll define later), there is no need to adjust the weights. However, if the network generates a “poor” output—an error, so to speak—then the system adapts, altering the weights in order to improve subsequent results.
There are several strategies for learning, and I'll examine two of them in this chapter.
Supervised Learning —Essentially, a strategy that involves a teacher that is smarter than the network itself. For example, let’s take the facial recognition example. The teacher shows the network a bunch of faces, and the teacher already knows the name associated with each face. The network makes its guesses, then the teacher provides the network with the answers. The network can then compare its answers to the known “correct” ones and make adjustments according to its errors. Our first neural network in the next section will follow this model.
Unsupervised Learning —Required when there isn’t an example data set with known answers. Imagine searching for a hidden pattern in a data set. An application of this is clustering, i.e. dividing a set of elements into groups according to some unknown pattern. I won’t be showing at any examples of unsupervised learning in this chapter, as this strategy is less relevant for the examples in this book.
Reinforcement Learning —A strategy built on observation. Think of a little mouse running through a maze. If it turns left, it gets a piece of cheese; if it turns right, it receives a little shock. (Don’t worry, this is just a pretend mouse.) Presumably, the mouse will learn over time to turn left. Its neural network makes a decision with an outcome (turn left or right) and observes its environment (yum or ouch). If the observation is negative, the network can adjust its weights in order to make a different decision the next time. Reinforcement learning is common in robotics. At time t, the robot performs a task and observes the results. Did it crash into a wall or fall off a table? Or is it unharmed? I'll showcase how reinforcement learning works in the context of our simulated steering vehicles.
This ability of a neural network to learn, to make adjustments to its structure over time, is what makes it so useful in the field of artificial intelligence. Here are some standard uses of neural networks in software today.
Pattern Recognition —I’ve mentioned this several times already and it’s probably the most common application. Examples are facial recognition, optical character recognition, etc.
Time Series Prediction —Neural networks can be used to make predictions. Will the stock rise or fall tomorrow? Will it rain or be sunny?
Signal Processing —Cochlear implants and hearing aids need to filter out unnecessary noise and amplify the important sounds. Neural networks can be trained to process an audio signal and filter it appropriately.
Control —You may have read about recent research advances in self-driving cars. Neural networks are often used to manage steering decisions of physical vehicles (or simulated ones).
Soft Sensors —A soft sensor refers to the process of analyzing a collection of many measurements. A thermometer can tell you the temperature of the air, but what if you also knew the humidity, barometric pressure, dewpoint, air quality, air density, etc.? Neural networks can be employed to process the input data from many individual sensors and evaluate them as a whole.
Anomaly Detection —Because neural networks are so good at recognizing patterns, they can also be trained to generate an output when something occurs that doesn’t fit the pattern. Think of a neural network monitoring your daily routine over a long period of time. After learning the patterns of your behavior, it could alert you when something is amiss.
This is by no means a comprehensive list of applications of neural networks. But hopefully it gives you an overall sense of the features and possibilities. The thing is, neural networks are complicated and difficult. They involve all sorts of fancy mathematics. While this is all fascinating (and incredibly important to scientific research), a lot of the techniques are not very practical in the world of building interactive, animated p5.js sketches. Not to mention that in order to cover all this material, I would need another book—or more likely, a series of books.
So instead, I'll begin our last hurrah in the nature of code with the simplest of all neural networks, in an effort to understand how the overall concepts are applied in code. Then I'll look at some p5.js sketches that generate visual results inspired by these concepts.
## 10.2 The Perceptron
Invented in 1957 by Frank Rosenblatt at the Cornell Aeronautical Laboratory, a perceptron is the simplest neural network possible: a computational model of a single neuron. A perceptron consists of one or more inputs, a processor, and a single output.

Figure 10.3: The perceptron
A perceptron follows the “feed-forward” model, meaning inputs are sent into the neuron, are processed, and result in an output. In the diagram above, this means the network (one neuron) reads from left to right: inputs come in, output goes out.
Let’s follow each of these steps in more detail.
Step 1: Receive inputs.
Say I have a perceptron with two inputs—let’s call them *x1* and *x2*.
Input 0: x1 = 12
Input 1: x2 = 4
Step 2: Weight inputs.
Each input that is sent into the neuron must first be weighted, i.e. multiplied by some value (often a number between -1 and 1). When creating a perceptron, you'll typically begin by assigning random weights. Here, let’s give the inputs the following weights:
Weight 0: 0.5
Weight 1: -1
We take each input and multiply it by its weight.
Input 0 * Weight 0 ⇒ 12 * 0.5 = 6
Input 1 * Weight 1 ⇒ 4 * -1 = -4
Step 3: Sum inputs.
The weighted inputs are then summed.
Sum = 6 + -4 = 2
Step 4: Generate output.
The output of a perceptron is generated by passing that sum through an activation function. In the case of a simple binary output, the activation function is what tells the perceptron whether to “fire” or not. You can envision an LED connected to the output signal: if it fires, the light goes on; if not, it stays off.
Activation functions can get a little bit hairy. If you start reading one of those artificial intelligence textbooks looking for more info about activation functions, you may soon find yourself reaching for a calculus textbook. However, with our friend the simple perceptron, I'm going to do something really easy. Let’s make the activation function the sign of the sum. In other words, if the sum is a positive number, the output is 1; if it is negative, the output is -1.
Output = sign(sum) ⇒ sign(2) ⇒ +1
Let’s review and condense these steps and translate them into code.
***The Perceptron Algorithm:***
For every input, multiply that input by its weight.
Sum all of the weighted inputs.
Compute the output of the perceptron based on that sum passed through an activation function (the sign of the sum).
Let’s assume we have two arrays of numbers, the inputs and the weights. For example:

 ``` 
let inputs  = [12 , 4];
let weights = [0.5, -1];
 ``` 

“For every input” implies a loop that multiplies each input by its corresponding weight. Since I need the sum, I can add up the results in that very loop.

 ``` 
// Steps 1 and 2: Add up all the weighted inputs.
let sum = 0;
for (let i = 0; i < inputs.length; i++) {
  sum += inputs[i] * weights[i];
}
 ``` 

Once I have the sum I can compute the output.

 ``` 
// Step 3: Passing the sum
// through an activation function
let output = activate(sum);

// The activation function
function activate(sum) {
  //{!2} Return a 1 if positive, -1 if negative.
  if (sum > 0) return 1;
  else return -1;
}
 ``` 

## 10.3 Simple Pattern Recognition Using a Perceptron
Now that I've demonstrated the computational process of a perceptron, let's look at an example of one in action. Earlier I noted that neural networks are often used for pattern recognition applications, such as facial recognition. Even simple perceptrons can demonstrate the basics of classification, as in the following example.

Figure 10.4
Consider a line in two-dimensional space. Points in that space can be classified as living on either one side of the line or the other. While this is a somewhat silly example (since there is clearly no need for a neural network; we can determine on which side a point lies with some simple algebra), it shows how a perceptron can be trained to recognize points on one side versus another.
Let’s say a perceptron has 2 inputs (the x- and y-coordinates of a point). Using a sign activation function, the output will either be -1 or 1—i.e., the input data are classified according to the sign of the output. In the above diagram, you can see how each point is either below the line (-1) or above (+1).
The perceptron itself can be diagrammed as follows:

Figure 10.5
You can see how there are two inputs (*x* and *y*), a weight for each input (*weight**x* and *weight**y*), as well as a processing neuron that generates the output.
There is a pretty significant problem here, however. Let’s consider the point (0,0). What if we send this point into the perceptron as its input: x = 0 and y = 0? What will the sum of its weighted inputs be? No matter what the weights are, the sum will always be 0! But this can’t be right—after all, the point (0,0) could certainly be above or below various lines in our two-dimensional world.
To avoid this dilemma, the perceptron will require a third input, typically referred to as a ***bias*** input. A bias input always has the value of 1 and is also weighted. Here is the perceptron with the addition of the bias:

Figure 10.6
Let’s go back to the point (0,0). Here are our inputs:
0 * weight for x = 0
0 * weight for y = 0
1 * weight for bias = weight for bias
The output is the sum of the above three values, 0 plus 0 plus the bias’s weight. Therefore, the bias, on its own, answers the question as to where (0,0) is in relation to the line. If the bias’s weight is positive, (0,0) is above the line; negative, it is below. It “biases” the perceptron’s understanding of the line’s position relative to (0,0).
## 10.4 Coding the Perceptron
I'm now ready to assemble the code for a Perceptron class. The only data the perceptron needs to track are the input weights, and I could use an array of floats to store these.

 ``` 
class Perceptron {
  constructor(){
    this.weights = [];
  }
 ``` 

The constructor could receive an argument indicating the number of inputs (in this case three: x, y, and a bias) and size the array accordingly.

 ``` 
  constructor(n) {
    this.weights = [];
    for (let i = 0; i < n; i++) {
      //{!1} The weights are picked randomly to start.
      this.weights[i] = random(-1, 1);
    }
  }
 ``` 

A perceptron needs to be able to receive inputs and generate an output. I can package these requirements into a function called feedforward(). In this example, I'll have the perceptron receive its inputs as an array (which should be the same length as the array of weights) and return the output as an integer.

 ``` 
  feedforward(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    //{!1} Result is the sign of the sum, -1 or +1.
    // Here the perceptron is making a guess.
    // Is it on one side of the line or the other?
    return activate(sum);
  }
 ``` 

Presumably, I could now create a Perceptron object and ask it to make a guess for any given point.

Figure 10.7

 ``` 
// Create the Perceptron.
let p = new Perceptron(3);
// The input is 3 values: x,y and bias.
let point = [50, -12, 1];
// The answer!
let result = p.feedforward(point);
 ``` 

Did the perceptron get it right? At this point, the perceptron has no better than a 50/50 chance of arriving at the right answer. Remember, when I created it, I gave each weight a random value. A neural network isn’t magic. It’s not going to be able to guess anything correctly unless I teach it how to!
To train a neural network to answer correctly, I'm going to employ the method of *supervised learning* that I described in [section 10.1](about:blank#chapter10_section1)
section 10.1.
With this method, the network is provided with inputs for which there is a known answer. This way the network can find out if it has made a correct guess. If it’s incorrect, the network can learn from its mistake and adjust its weights. The process is as follows:
Provide the perceptron with inputs for which there is a known answer.
Ask the perceptron to guess an answer.
Compute the error. (Did it get the answer right or wrong?)
Adjust all the weights according to the error.
Return to Step 1 and repeat!
