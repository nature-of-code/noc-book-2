<section data-type="sect1" id="chapter02_section4">
<h2>2.4 Dealing with Mass</h2>
<a data-primary="mass" data-secondary="modeling" data-type="indexterm"></a>
<a data-primary="natural phenomena" data-secondary="mass" data-tertiary="modeling"
data-type="indexterm"></a>
<p>
OK. I’ve got one small (but fundamental) addition to make before
integrating forces into the <code>Mover</code> class. After all, Newton’s second law is really
<span data-type="equation">\vec{F} = M \times \vec{A}</span>, not
<span data-type="equation">\vec{F} = \vec{A}</span>. Incorporating mass is
as easy as adding an instance variable to the class, but I need to spend
a little more time here because of another impending complication.
</p>
<p>First I’ll add mass.</p>
<pre data-code-language="javascript" data-type="programlisting" class="codesplit">
class Mover {
constructor(){
this.position = createVector();
this.velocity = createVector();
this.acceleration = createVector();
//{!1} Adding mass as a number
this.mass = ????;
}
}</pre>
<a data-primary="mass" data-secondary="units of measurement" data-tertiary="defining"
data-type="indexterm"></a>
<div data-type="note">
<h2>Units of Measurement</h2>
<p>
Now that I am introducing mass, it’s important to make a quick note
about units of measurement. In the real world, things are measured in
specific units. Two objects are 3 meters apart, the baseball
is moving at a rate of 90 miles per hour, or this bowling ball has a
mass of 6 kilograms. As you’ll see later in this book, sometimes you will
want to take real-world units into consideration. However, in this
chapter, I’m going to ignore them for the most part. The units of
measurement are in pixels (“These two circles are 100 pixels apart”) and
frames of animation (“This circle is moving at a rate of 2 pixels per
frame”). In the case of mass, there isn’t any unit of measurement
to use. I’m just going to make something up. In this example, I will
arbitrarily picking the number 10. There is no unit of measurement,
though you might enjoy inventing a unit of your own, like “1 moog” or “1
yurkle.” It should also be noted that, for demonstration purposes, I’ll
tie mass to pixels (drawing, say, a circle with a radius of 10). This
will allow me to visualize the mass of an object albeit inaccurately. In the real
world size does not indicate mass. A small metal ball could have a much higher mass than a
large balloon due to its higher density. And for two circular objects with equal density,
the mass should be tied to the formula for area which is not as simple as the radius alone.
</p>
</div>
<p>
Mass is a scalar, not a vector, as it’s just one number describing
the amount of matter in an object. I could get fancy and
compute the area of a shape as its mass, but it’s simpler to begin by
saying, “Hey, the mass of this object is…um, I dunno…how about 10?”
</p>
<pre data-code-language="javascript" data-type="programlisting" class="codesplit">
constructor() {
this.position = createVector(random(width), random(height));
this.velocity = createVector(0, 0);
this.acceleration = createVector(0, 0);
this.mass = 10;
}</pre>
<a data-primary="forces" data-secondary="applying to objects" data-type="indexterm"></a>
<p>
This isn’t so great since things only become interesting once I have
objects with varying mass, but it’s enough to get us started. Where does mass come
in? It’s needed for applying Newton’s second law to the object.
</p>
<pre data-code-language="javascript" data-type="programlisting" class="codesplit">
applyForce(force) {
//{!2} Newton's second law (with force accumulation and mass)
force.div(mass);
this.acceleration.add(force);
}</pre>
<p>
Yet again, even though the code looks quite reasonable, there is a
major problem here. Consider the following scenario with two
<code>Mover</code> objects, both being blown away by a wind force.
</p>
<pre data-code-language="java" data-type="programlisting" class="codesplit">
let m1 = new Mover();
let m2 = new Mover();
let wind = createVector(1, 0);
m1.applyForce(wind);
m2.applyForce(wind);</pre>
<p>
Again, I’ll <em>be</em> the computer. Object <code>m1</code> receives the
wind force—(1,0)—divides it by mass (10), and adds it to acceleration.
</p>
<p>
<span class="formula">m1 equals wind force: &nbsp;&nbsp;&nbsp;
(1,0)</span><br />
<span class="formula">Divided by mass of 10: &nbsp;&nbsp; (0.1,0)</span>
</p>
<a data-primary="object-oriented programming"
data-secondary="references to vs. copies of objects" data-type="indexterm"></a>
<p>
OK. Moving on to object <code>m2</code>. It also receives the wind
