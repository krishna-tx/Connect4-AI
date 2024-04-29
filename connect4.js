var currPlayer = 'R';
var availableRow = [5, 5, 5, 5, 5, 5, 5];
var boardMatrix = [];

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
        let arr = []
        for(let j = 0; j < 7; j++) {
            arr.push('');
            let cell = document.createElement("div");
            cell.id = i + "-" + j;
            cell.classList.add("cell");
            board.append(cell);
        }
        boardMatrix.push(arr);
    }
}

function placeMove() {
    let row, col;
    col = parseInt(this.id);
    row = availableRow[col];
    
    if(row < 0) { return; }
    availableRow[col]--;

    let cell = document.getElementById(row + "-" + col);
    if(currPlayer == 'R') {
        cell.style.backgroundColor = "red";
        boardMatrix[row][col] = 'R';
        currPlayer = 'Y';
    }
    else {
        cell.style.backgroundColor = "yellow";
        boardMatrix[row][col] = 'Y';
        currPlayer = 'R';
    }
    checkState();
}

function checkState() {
    // check rows
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 4; j++) {
            let val = boardMatrix[i][j];
            if(val != '' && val == boardMatrix[i][j+1] && val == boardMatrix[i][j+2] && val == boardMatrix[i][j+3]) {
                let cell1 = document.getElementById(i + "-" + j);
                let cell2 = document.getElementById(i + "-" + (j+1));
                let cell3 = document.getElementById(i + "-" + (j+2));
                let cell4 = document.getElementById(i + "-" + (j+3));

                cell1.style.backgroundColor = "black";
                cell2.style.backgroundColor = "black";
                cell3.style.backgroundColor = "black";
                cell4.style.backgroundColor = "black";

                if(val == 'R') { console.log("Red won!"); }
                else { console.log("Yellow won!"); }
                endGame();
                return;
            }
        }
    }

    // check columns
    for(let j = 0; j < 7; j++) {
        for(let i = 0; i < 3; i++) {
            let val = boardMatrix[i][j];
            if(val != '' && val == boardMatrix[i+1][j] && val == boardMatrix[i+2][j] && val == boardMatrix[i+3][j]) {
                let cell1 = document.getElementById(i + "-" + j);
                let cell2 = document.getElementById((i+1) + "-" + j);
                let cell3 = document.getElementById((i+2) + "-" + j);
                let cell4 = document.getElementById((i+3) + "-" + j);

                cell1.style.backgroundColor = "black";
                cell2.style.backgroundColor = "black";
                cell3.style.backgroundColor = "black";
                cell4.style.backgroundColor = "black";

                if(val == 'R') { console.log("Red won!"); }
                else { console.log("Yellow won!"); }
                endGame();
                return;
            }
        }
    }

    // check \ diagonal
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 4; j++) {
            let val = boardMatrix[i][j];
            if(val != '' && val == boardMatrix[i+1][j+1] && val == boardMatrix[i+2][j+2] && val == boardMatrix[i+3][j+3]) {
                let cell1 = document.getElementById(i + "-" + j);
                let cell2 = document.getElementById((i+1) + "-" + (j+1));
                let cell3 = document.getElementById((i+2) + "-" + (j+2));
                let cell4 = document.getElementById((i+3) + "-" + (j+3));

                cell1.style.backgroundColor = "black";
                cell2.style.backgroundColor = "black";
                cell3.style.backgroundColor = "black";
                cell4.style.backgroundColor = "black";

                if(val == 'R') { console.log("Red won!"); }
                else { console.log("Yellow won!"); }
                endGame();
                return;
            }
        }
    }

    // check / diagonal
    for(let i = 0; i < 3; i++) {
        for(let j = 3; j < 7; j++) {
            let val = boardMatrix[i][j];
            if(val != '' && val == boardMatrix[i+1][j-1] && val == boardMatrix[i+2][j-2] && val == boardMatrix[i+3][j-3]) {
                let cell1 = document.getElementById(i + "-" + j);
                let cell2 = document.getElementById((i+1) + "-" + (j-1));
                let cell3 = document.getElementById((i+2) + "-" + (j-2));
                let cell4 = document.getElementById((i+3) + "-" + (j-3));

                cell1.style.backgroundColor = "black";
                cell2.style.backgroundColor = "black";
                cell3.style.backgroundColor = "black";
                cell4.style.backgroundColor = "black";

                if(val == 'R') { console.log("Red won!"); }
                else { console.log("Yellow won!"); }
                endGame();
                return;
            }
        }
    }

    // check for draw
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
            if(boardMatrix[i][j] == '') { return; }
        }
    }

    // all cells filled but no winner => game is draw
    console.log("Draw!");
    endGame();
}

function endGame() {
    let selectors = document.getElementsByClassName("selector");
    for(let i = 0; i < selectors.length; i++) {
        selectors[i].removeEventListener("click", placeMove); // don't listen for clicks
    }
}

function restartGame() {
    currPlayer = 'R';
    availableRow = [5, 5, 5, 5, 5, 5, 5];

    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
            boardMatrix[i][j] = '';
            let cell = document.getElementById(i + "-" + j);
            cell.style.backgroundColor = "white";
        }
    }

    let selectors = document.getElementsByClassName("selector");
    for(let i = 0; i < selectors.length; i++) {
        selectors[i].addEventListener("click", placeMove);
    }
}