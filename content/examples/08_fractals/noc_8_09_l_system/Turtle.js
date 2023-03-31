// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function Turtle(s, l, t) {
  this.todo = s;
  this.len = l;
  this.theta = t;

  this.render = function() {
    stroke(255);
    for (var i = 0; i < this.todo.length; i++) {
      var c = this.todo.charAt(i);
      if (c === 'F' || c === 'G') {
        line(0,0,this.len,0);
        translate(this.len,0);
      }
      else if (c === '+') {

        rotate(this.theta);
      }
      else if (c === '-') {
        rotate(-this.theta);
      }
      else if (c === '[') {
        push();
      }
      else if (c === ']') {
        pop();
      }
    }
  };

  this.setLen = function(l) {
    this.len = l;
  };

  this.changeLen = function(percent) {
    this.len *= percent;
  };

  this.setToDo = function(s) {
    this.todo = s;
  };
}
