class Cell {

  constructor(x, y, state, resolution) {
    this.pos = createVector(x * resolution, y * resolution);
    this.resolution = resolution;
    this.state = state;
    this.next = state;
  }

  new_state(new_state) {
    this.next = new_state;
  }

  update_state() {
    // update current state with new value 
    this.state = this.next;
  }

  display() {
    if (this.next == 1) {
      if (this.state == 0) fill(0, 200, 0);
      else fill(255);
    } else if (this.next == 0 && this.state == 1) fill(200, 0, 0);
    else fill(80);
    
    square(this.pos.x, this.pos.y, this.resolution);
    this.update_state();
  }
}