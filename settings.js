const exportButton = document.querySelector('#export-btn');
const saveButton = document.querySelector('#save-btn');
const refreshButton = document.querySelector('#refresh-btn');
const resetButton = document.querySelector('#reset-btn');

function setupEvents() {
    exportButton.addEventListener('click', event => {
        disableStroke = true;
        forceNewFrame();
        save('Pixel-blob.svg');
    });
    
    saveButton.addEventListener('click', event => {
        saveGridPoints();
    });

    resetButton.addEventListener('click', event => {
        const url = new URL(window.location.href);
        window.location.href = url.origin;
    });
}

let pointSeperator = "-";
let vectorSeperator = "V";
function saveGridPoints() {
    let map = [];
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            if (grid[x][y].state === "active") {
                map.push(`${x}${pointSeperator}${y}`)
            }
        }
    }
    const mapString = map.join(vectorSeperator);
    console.log(map)
    const url = setURLParams();
    url.searchParams.set("map", `${mapString}`);
    console.log(url.href)
    window.location.href = url.href;
}

function setURLParams() {
    let url = new URL(window.location.href);

    url.searchParams.set("size", size);
    url.searchParams.set("bezier", bezier);
    // url.searchParams.set("overflow", overflow);

    return url;
}
  
function loadGridPoints() {
    const mapString = params.map;
    if (!mapString) return [];

    const map = mapString.split(vectorSeperator);
    const points = [];
    for (let vector of map) {
        const [x, y] = vector.split(pointSeperator);
        
        points.push({x: x, y: y});
    }
    return points;
}