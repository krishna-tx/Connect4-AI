var currPlayer = "R";
var freeRows = [5, 5, 5, 5, 5, 5, 5];

window.onload = function() {
    setup();
}

function setup() {
    // selectors
    let selectors = document.getElementById("selectors-container")
    for(let j = 0; j < 7; j++) {
        let selector = document.createElement("div");
        selector.id = j;
        selector.classList.add("selector");
        selector.addEventListener("click", placeMove);
        selectors.append(selector);
    }

    // cells
    let board = document.getElementById("board");
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
            let cell = document.createElement("div");
            cell.id = i + "-" + j;
            cell.classList.add("cell");
            board.append(cell);
        }
    }
}

function placeMove() {
    let row, col;
    col = parseInt(this.id);
    row = freeRows[col];
    
    if(row < 0) { return; }
    freeRows[col]--;

    let cell = document.getElementById(row + "-" + col);
    if(currPlayer == "R") {
        cell.classList.add("red-piece");
        currPlayer = "Y";
    }
    else {
        cell.classList.add("yellow-piece");
        currPlayer = "R";
    }
}
