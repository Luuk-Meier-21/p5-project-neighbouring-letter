/**
 * Cells, Neighbours and bridges:
 * 
 *  |   |   |   |
 *  | N | a |   |
 *  | b | C | b |
 *  |   | a | N |
 *  |   |   |   |
 * 
 * C: Cell, the cell that was interacted with last
 * N: Neighbour, a cell that is within a corner of C
 * a: Bridge A, a cell acting as a bridge between C and N (N.x, C.y)
 * b: Bridge B, a cell acting as a bridge between C and N (C.x, N.y)
 */

function Cell(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = "default"; // default, active, bridge
    this.color = "transparent";

    this.activeNeighbours = [false, false, false, false];

    this.draw = () => {
        push();
        translate(this.x * size, this.y * size);
        if (this.state === "bridge") {
            fill(100);
            rotateCenter(this.w, this.h, 45)
            rect(0, 0, this.w, this.h);
        } else {
            fill(this.color);

            rect(0, 0, this.w, this.h);
        }
        
        pop();
    }

    this.update = () => {
        if (this.state == "active") {
            // Active:
            this.color = 0;
        } else {
            this.color = "transparent";
        }
        this.updateBridges();
    }

    this.updateBridges = () => {
        const setBridges = (condition, cy, cx, nx, ny, onBridged = () => {}) => {
            const intersectNeighbours = (cellX, cellY, neighbourX, neighbourY) => (
                [{ x: neighbourX, y: cellY }, { x: cellX, y: neighbourY }]
            );
            const switchState = (x, y, string) => {
                if (
                    cell.state === "active" &&
                    neighbour.state === "active" &&
                    grid[x][y].state === "default"
                ) {
                    // Cell and target Neighbour are both active, 
                    // target cell for bridge is set to default state and this free to set to "bridge" state.
                    // Sets bridge target to "bridge" state
                    grid[x][y].state = "bridge";
                } else if (
                    // For removing bridges when a active cell is removed form neighbours.
                    // Checks if cell is now "default" and if the bridges are still there for removal.
                    cell.state === "default" &&
                    grid[x][y].state === "bridge"
                ) {
                    grid[x][y].state = "default";
                }
            }
            const cell = grid[cy][cx];
            const neighbour = grid[nx][ny];
            const [bridgePosA, bridgePosB] = intersectNeighbours(cell.x, cell.y, neighbour.x, neighbour.y);
            if (condition) {
                switchState(bridgePosA.x, bridgePosA.y, "a");
                switchState(bridgePosB.x, bridgePosB.y, "b");
            } 
        }
        const neighbours = this.getActiveNeighbours(this.x, this.y);
        if (neighbours[0]) setBridges(neighbours[0], x, y, x-1, y-1);
        if (neighbours[1]) setBridges(neighbours[1], x, y, x+1, y-1);
        if (neighbours[2]) setBridges(neighbours[2], x, y, x+1, y+1);
        if (neighbours[3]) setBridges(neighbours[3], x, y, x-1, y+1);
    }
  
    this.toggle = () => {
        if (this.state === "active") {
            this.state = "default";
        } else {
            this.state = "active";
        }
        // Updates final time so even default state can update:
        this.update();
    }
  
    this.onClick = (mouseX, mouseY) => {
        const x = this.x * size;
        const y = this.y * size;
        if ((mouseX > x) && (mouseX < x+w) && (mouseY > y) && (mouseY < y+h)) {
            this.toggle();
            // console.log(this)
        } 
    }
  
    /**
     * Counting order:
     * 1 -— > 2
     *        |
     *        v
     * 3 < —— 4
     */
  
    this.getActiveNeighbours = (x, y) => {
      const neighbours = [
        [x - 1, y - 1],
        [x + 1, y - 1],
        [x + 1, y + 1],
        [x - 1, y + 1],
      ]

      return neighbours.map(([x, y]) => {
        return grid[x][y].state === "active"
      });
    }
}


function BridgeCell(x, y, w, h) {
    Cell.apply(this, arguments);
    this.activeFaces = this.getActiveNeighbours(x, y);
    this.state = "bridge";

    this.toggle = () => {
        this.reset();
    }

    this.draw = () => {
        push();
        
        fill(150);
        rect(this.x * size, this.y * size, this.w, this.h);
        pop();
    }
}

BridgeCell.prototype = Cell.prototype;
BridgeCell.prototype.constructor = BridgeCell;