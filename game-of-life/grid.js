class Grid {

  constructor(cell_size) {
    this.resolution = cell_size;
    // Determine the number of columns and rows based on sketch's width and height
    this.cols = (width / this.resolution);
    this.rows = (height / this.resolution);

    this.grid = this.make2Darray(this.cols, this.rows);
    // this.new_grid = this.make2Darray(this.cols, this.rows);
    this.init();
  }

  make2Darray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }

  init() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let state = round(random());

        this.grid[i][j] = new Cell(i, j, state, this.resolution);
        // this.grid[i][j] = state;
      }
    }
  }

  update() {
    // this.new_grid = this.make2Darray(this.cols, this.rows);

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {

        let n = this.countNeighbours(i, j);

        let state = this.grid[i][j].state;
        // let state = this.grid[i][j]
        let new_state;

        // over and under production rules
        if (state == 1 && (n < 2 || n > 3)) new_state = 0;
        // reproduction rule
        else if (state == 0 && n == 3) new_state = 1;
        else new_state = state;

        this.grid[i][j].new_state(new_state);
        // this.new_grid[i][j] = new_state;
      }
    }
    // this.display()
    // this.grid = this.new_grid;
  }

  countNeighbours(x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + this.cols) % this.cols;
        let row = (y + j + this.rows) % this.rows;
        sum += this.grid[col][row].state;
        // sum += this.grid[col][row];
      }
    }
    sum -= this.grid[x][y].state;
    // sum -= this.grid[x][y];
    return sum;
  }

  display(debug) {

    for (let i = 0; i < this.cols; i++) {
      let x = i * this.resolution;
      line(x, 0, x, height);

      for (let j = 0; j < this.rows; j++) {
        let y = j * this.resolution;
        line(0, y, width, y);

        // if (this.grid[i][j] == 1) square(x, y, this.resolution);
        // if (this.grid[i][j].next == 1) square(x, y, this.resolution);
        // this.grid[i][j].update_state();

        this.grid[i][j].display();
        if (debug) {
          text(this.countNeighbours(i, j).toString(), x + 10, y + 20);
        }
      }
    }
  }

  run(debug) {
    this.update();
    this.display(debug);
  }


  create_cell(x, y) {
    let i = Math.floor(x / this.size);
    let j = Math.floor(y / this.size);
    this.grid[i][j] = 1;
  }





}