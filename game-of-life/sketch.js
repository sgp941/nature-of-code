var grid;
var debug = false;
var resolution = 10;

function setup() {
  createCanvas(500, 600);

  // start, stop, and step buttons
  start_button = createButton('start');
  start_button.mousePressed(start);
  stop_button = createButton('stop');
  stop_button.mousePressed(stop);
  stop_button = createButton('step');
  stop_button.mousePressed(step);
  // noLoop();

  checkbox = createCheckbox('debug', false);
  checkbox.changed(myCheckedEvent);

  grid = new Grid(resolution);
}

function draw() {
  background(80);

  grid.run(debug)
}

function stop() {
  noLoop();
}

function start() {
  loop();
}

function step() {
  redraw();
}

function myCheckedEvent() {
  if (this.checked()) debug = true;
  else debug = false;
}