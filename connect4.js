var currPlayer = 'R';
var aiPlayer, oppPlayer;
var availableRow = [5, 5, 5, 5, 5, 5, 5];
var boardMatrix = [];
var prevMoves = [];
var player;

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

function selectedPlayerRed() {
    console.log("You chose to play red");
    aiPlayer = 'Y', oppPlayer = 'R';
    let buttonRed = document.getElementById("Red-button");
    let buttonYellow = document.getElementById("Yellow-button");
    buttonRed.disabled = true;
    buttonYellow.disabled = true;
    startGame();
}

function selectedPlayerYellow() {
    console.log("You chose to play yellow");
    aiPlayer = 'R', oppPlayer = 'Y';
    let buttonRed = document.getElementById("Red-button");
    let buttonYellow = document.getElementById("Yellow-button");
    buttonRed.disabled = true;
    buttonYellow.disabled = true;
    startGame();
}

function clearBoard() {
    aiPlayer = undefined;
    currPlayer = 'R';
    availableRow = [5, 5, 5, 5, 5, 5, 5];
    prevMoves = [];

    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
            boardMatrix[i][j] = '';
            let cell = document.getElementById(i + "-" + j);
            cell.style.backgroundColor = "white";
            cell.style.borderColor = "navy";
        }
    }

    // allow selectors to be clicked
    let selectors = document.getElementsByClassName("selector");
    for(let i = 0; i < selectors.length; i++) {
        selectors[i].addEventListener("click", placeMove);
    }

    // allow player selecting buttons to be clicked
    let buttonRed = document.getElementById("Red-button");
    let buttonYellow = document.getElementById("Yellow-button");
    buttonRed.disabled = false;
    buttonYellow.disabled = false;

    console.log("board cleared");
}

function startGame() {
    player = new Connect4Player(aiPlayer, oppPlayer);
    if(currPlayer == aiPlayer) { player.makeMove(boardMatrix); }
}

function placeMove() {
    let row, col;
    col = parseInt(this.id);
    row = availableRow[col];
    
    if(row < 0) { return; }
    availableRow[col]--;

    let cell = document.getElementById(row + "-" + col);
    if(currPlayer == 'R') {
        prevMoves.push('R' + (col+1));
        cell.style.backgroundColor = "red";
        boardMatrix[row][col] = 'R';
        currPlayer = 'Y';
    }
    else {
        prevMoves.push('Y' + (col+1));
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

                let cells = [cell1, cell2, cell3, cell4];
                for(let i = 0; i < 4; i++) {
                    cells[i].style.borderColor = "white";
                }

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

                let cells = [cell1, cell2, cell3, cell4];
                for(let i = 0; i < 4; i++) {
                    cells[i].style.borderColor = "white";
                }

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

                let cells = [cell1, cell2, cell3, cell4];
                for(let i = 0; i < 4; i++) {
                    cells[i].style.borderColor = "white";
                }

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

                let cells = [cell1, cell2, cell3, cell4];
                for(let i = 0; i < 4; i++) {
                    cells[i].style.borderColor = "white";
                }

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
            if(boardMatrix[i][j] == '') { // empty cell exists
                if(currPlayer == aiPlayer) { player.makeMove(boardMatrix); }
                return; 
            }
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
    console.log(prevMoves);

    // don't allow player selecting buttons to be clicked
    let buttonRed = document.getElementById("Red-button");
    let buttonYellow = document.getElementById("Yellow-button");
    buttonRed.disabled = true;
    buttonYellow.disabled = true;
}