// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Sensor {
  constructor(v) {
    this.v = v.copy();
    this.value = 0;
  }
  
  sense(position, food) {
    // Find the "tip" (or endpoint) of the sensor by adding position
    let end = p5.Vector.add(position, this.v);
    // How far is it from the food center
    let d = end.dist(food.position);
    // If it is within the radius light up the sensor  
    if (d < food.r) {
      // The further into the center the food, the more the sensor activates
      this.value = 1;
    } else {
     // this.value = 0;
    }
  }
}