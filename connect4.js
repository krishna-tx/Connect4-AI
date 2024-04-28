var currPlayer = "R";

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