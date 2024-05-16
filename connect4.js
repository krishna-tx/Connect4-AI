var currPlayer = "red";
var redPlayer = "human", yellowPlayer = "human";
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
    clearBoard();
}

function assignRedPlayer() {
    let redPlayerSelector = document.getElementById("red-player-selector");
    let option = redPlayerSelector.value;

    if(option == "computer") { 
        // check if both players are computers
        if(yellowPlayer != "human") {
            redPlayer = "human";
            redPlayerSelector.value = "human";
            alert("Red and Yellow players cannot both be played by the computer!");
        }
        else { redPlayer = new Connect4Player("red", "yellow"); }
    }
    else { redPlayer = "human"; }
}

function assignYellowPlayer() {
    let yellowPlayerSelector = document.getElementById("yellow-player-selector");
    let option = yellowPlayerSelector.value;

    if(option == "computer") { 
        // check if both players are computers
        if(redPlayer != "human") {
            yellowPlayer = "human";
            yellowPlayerSelector.value = "human";
            alert("Red and Yellow players cannot both be played by the computer!");
            return;
        }
        else { yellowPlayer = new Connect4Player("yellow", "red"); }
    }
    else { yellowPlayer = "human"; }
}

function disableBoard() {
    let selectors = document.getElementsByClassName("selector");
    for(let i = 0; i < selectors.length; i++) {
        selectors[i].removeEventListener("click", placeMove); // don't listen for clicks
    }
}

function clearBoard() {
    assignRedPlayer();
    assignYellowPlayer();

    currPlayer = "red";
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

    // enable Start Game Button
    let startGameButton = document.getElementById("start-button")
    startGameButton.disabled = false;

    // disable board
    disableBoard();

    console.log("board cleared");
}

function startGame() {
    // allow selectors to be clicked
    let selectors = document.getElementsByClassName("selector");
    for(let i = 0; i < selectors.length; i++) {
        selectors[i].addEventListener("click", placeMove);
    }

    // disable Start Game Button
    let startGameButton = document.getElementById("start-button")
    startGameButton.disabled = true;

    if(redPlayer != "human") { redPlayer.makeMove(boardMatrix); }
}

function placeMove() {
    let row, col;
    col = parseInt(this.id);
    row = availableRow[col];
    
    if(row < 0) { return; }
    availableRow[col]--;

    let cell = document.getElementById(row + "-" + col);
    prevMoves.push(currPlayer + (col+1));
    cell.style.backgroundColor = currPlayer;
    boardMatrix[row][col] = currPlayer;
    
    if(currPlayer == "red") { currPlayer = "yellow"; }
    else { currPlayer = "red"; }
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

                if(val == "red") { console.log("Red won!"); }
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

                if(val == "red") { console.log("Red won!"); }
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

                if(val == "red") { console.log("Red won!"); }
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

                if(val == "red") { console.log("Red won!"); }
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
                // if(currPlayer == aiPlayer) { player.makeMove(boardMatrix); }
                if(currPlayer == "red" && redPlayer != "human") { redPlayer.makeMove(boardMatrix); }
                else if(currPlayer == "yellow" && yellowPlayer != "human") { yellowPlayer.makeMove(boardMatrix); }
                return; 
            }
        }
    }

    // all cells filled but no winner => game is draw
    console.log("Draw!");
    endGame();
}

function endGame() {
    disableBoard();
    console.log(prevMoves);
}