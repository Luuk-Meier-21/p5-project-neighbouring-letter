let grid;
let size = 50;
let bezier = 1000;
let showBridges = true;
let roundCorners = true;
let columns;
let rows; 
let disableStroke;

function setup() {
  createCanvas(500, 500)
  // frameRate(1);

  columns = floor(windowWidth / size);
  rows = floor(windowHeight / size);
  if (bezier > size / 2) bezier = size / 2;

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
}

function draw() {
  // background(255);
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y].draw();
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

function keyPressed() {
  if (keyCode === 32) {
    disableStroke = !disableStroke
    console.log(disableStroke);
  }

  if (disableStroke) {
    noStroke();
  } else {
    stroke(1);
  }
}


