<p>
In the final example of Chapter 1, I demonstrated how to calculate a dynamic
acceleration based on a vector pointing from a circle on the canvas to the
mouse position. The resulting motion resembles a magnetic attraction between
shape and mouse, as if some <em>force</em> was pulling the circle in
towards the mouse. In this chapter I will detail
the concept of a force and its relationship to acceleration. The goal, by
the end of this chapter, is to build a simple physics engine and understand how objects
move around a canvas by responding to a variety of environmental forces.
</p>
<section data-type="sect1" id="chapter02_section1">
<h2>2.1 Forces and Newton’s Laws of Motion</h2>
<a data-primary="forces" data-secondary="Newton's laws of motion" data-type="indexterm"></a>
<a data-primary="Newton" data-secondary="Isaac" data-type="indexterm"></a>
<p>
Before I examine the practical realities of simulating forces and building a basic physics
engine in code, let’s take a conceptual look at what it means to be a force in the
real world. Just like the word “vector,” the term “force” can be used to mean a
variety of things. It can indicate a powerful intensity, as in “They pushed
the boulder with great force” or “They spoke forcefully.” The definition of
<strong><em>force</em></strong> that I care about is more formal and
comes from Sir Isaac Newton’s laws of motion:
</p>
<a data-primary="forces" data-secondary="defined" data-type="indexterm"></a>
<p>
<span class="highlight">A force is a vector that causes an object with mass to
accelerate.</span>
</p>
<p>
The good news is that you hopefully recognize the first part of the definition:
<em>a force is a vector</em>. Thank goodness you just spent a whole chapter
learning what a vector is and how to program with vectors!
</p>
<p>
Let’s define Newton’s three laws of motion in relation to the concept of a force.
</p>
<section data-type="sect2" id="_newton_s_first_law">
<h3>Newton’s First Law</h3>
<a data-primary="Newton's first law" data-type="indexterm"></a>
<p>Newton’s first law is commonly stated as:</p>
<p>
<span class="highlight">An object at rest stays at rest and an object in motion stays in
motion.</span>
</p>
<p>
However, this is missing an important element related to forces. I could expand the
definition by stating:
</p>
<p>
<span class="highlight">An object at rest stays at rest and an object in motion stays in
motion at a constant speed and direction unless acted upon by an unbalanced force.</span>
</p>
<a data-primary="Aristotle" data-type="indexterm"></a>
<p>
By the time Newton came along, the prevailing theory of
motion—formulated by Aristotle—was nearly two thousand years old. It
stated that if an object is moving, some sort of force is required to
keep it moving. Unless that moving thing is being pushed or pulled, it
will simply slow down or stop. Right?
</p>
<a data-primary="equilibrium" data-type="indexterm"></a>
<a data-primary="forces" data-secondary="equilibrium" data-type="indexterm"></a>
<a data-primary="forces" data-secondary="terminal velocity" data-type="indexterm"></a>
<a data-primary="terminal velocity" data-type="indexterm"></a>
<p>
This, of course, is not true. In the absence of any forces, no force is
required to keep an object moving. An object (such as a ball) tossed in
the earth’s atmosphere slows down because of air resistance (a force).
An object’s velocity will only remain constant in the absence of any
forces or if the forces that act on it cancel each other out, i.e. the
net force adds up to zero. This is often referred to as
<strong><em>equilibrium</em></strong>. The falling ball will reach a
terminal velocity (that stays constant) once the force of air resistance equals the force of
gravity.
</p>
<figure id="chapter02_figure1">
<img
alt="Figure 2.1: The pendulum doesn't move because all the forces cancel each other out (add up to a net force of zero)."
src="chapter02/ch02_01.png" />
<figcaption>
Figure 2.1: The pendulum doesn't move because all the forces cancel
each other out (add up to a net force of zero).&nbsp;
</figcaption>
</figure>
<p>
Considering a p5.js canvas, I could restate Newton’s first law as follows:
</p>
<a data-primary="Newton's first law" data-secondary="PVector class and"
data-type="indexterm"></a>
<a data-primary="PVector class (Processing)" data-secondary="Newton's first law and"
data-type="indexterm"></a>
<p>
<span class="highlight">An object’s velocity vector will remain constant if it is in a state
of equilibrium.</span>
</p>
<p>
Skipping Newton’s second law (arguably the most important law for the
purposes of this book) for a moment, let’s move on to the third law.
</p>
<a data-primary="Newton's third law" data-type="indexterm"></a>
