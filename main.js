let grid;
let size = 50;
let columns;
let rows; 

function setup() {
  createCanvas(500, 500)
  frameRate(60)
  columns = floor(windowWidth / size);
  rows = floor(windowHeight / size);;

  grid = new Array(columns);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
  }

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      const xPos = x * size;
      const yPos = y * size;
      grid[x][y] = new Cell(x, y, size, size);
    }
  }

  console.log(grid)
}

function draw() {
  background(200)

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y].state === ("active" || "bridge")) {
        grid[x][y].update();
      }
      grid[x][y].draw();
      // console.log(typeof grid[x][y]);
    }
  }
}

function mousePressed() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y].onClick(mouseX,mouseY);
    }
  }
}


