let grid;
let columns;
let rows; 

// Settings;
let size = 50;
let bezier = 100;
let overflow = 25;
let savedMap;

// Toggle Settings;
let showBridges = true;
let roundCorners = true;
let disableStroke = false;
 
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

size = params.size ? parseInt(params.size) : size;
bezier = params.bezier ? parseInt(params.bezier) : bezier;
overflow = params.overflow ? parseInt(params.overflow) : overflow;

function setup() {
  let c = createCanvas(500, 500, SVG);
  c.parent("canvas-wrapper");
  frameRate(30);
  setupEvents();

  savedMap = loadGridPoints();
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

  for (let i = 0; i < savedMap.length; i++) {
    const v = savedMap[i];
    grid[v.x][v.y].state = "active";
    grid[v.x][v.y].update();
  }
  
}

function draw() {
  if (disableStroke) {
    noStroke();
  } else {
    stroke(1);
  }
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y].draw();
    }
  }
  noLoop();
}

function mousePressed() {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y].onClick(mouseX,mouseY);
    }
  }
  loop();
}

function keyPressed() {
  if (keyCode === 32) {
    disableStroke = !disableStroke
    loop();
  }
}


