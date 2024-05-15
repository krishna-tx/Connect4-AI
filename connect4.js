var currPlayer = "Red";
var aiPlayer, oppPlayer;
var redPlayer, yellowPlayer;
var availableRow = [5, 5, 5, 5, 5, 5, 5];
var boardMatrix = [];
var prevMoves = [];
var player;
// var redPlayerSelected, yellowPlayerSelected;

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
    clearBoard();
}

function clearBoard() {
    // selectedPlayerRed = false, selectedPlayerYellow = false;
    aiPlayer = undefined;
    redPlayer = "Human", currPlayer = "Human"
    currPlayer = "Red";
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

    console.log("board cleared");
}

function startGame() {
    player = new Connect4Player(aiPlayer, oppPlayer);
    if(currPlayer == aiPlayer) { player.makeMove(boardMatrix); }
}

function placeMove() {
    // // check if both players have selected to play as human or computer
    // if(!redPlayerSelected && !yellowPlayerSelected) { // both not chosen
    //     window.alert("Please Select the Players for Red and Yellow");
    //     return;
    // }
    // if(!redPlayerSelected) { // red player not chosen
    //     window.alert("Please Select the Player for Red");
    //     return;
    // }
    // if(!yellowPlayerSelected) { // yellow player not chosen
    //     window.alert("Please Select the Player for Yellow");
    //     return;
    // }

    let row, col;
    col = parseInt(this.id);
    row = availableRow[col];
    
    if(row < 0) { return; }
    availableRow[col]--;

    let cell = document.getElementById(row + "-" + col);
    if(currPlayer == "Red") {
        prevMoves.push("Red" + (col+1));
        cell.style.backgroundColor = "red";
        boardMatrix[row][col] = "Red";
        currPlayer = "Yellow";
    }
    else {
        prevMoves.push("Yellow" + (col+1));
        cell.style.backgroundColor = "yellow";
        boardMatrix[row][col] = "Yellow";
        currPlayer = "Red";
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

                if(val == "Red") { console.log("Red won!"); }
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

                if(val == "Red") { console.log("Red won!"); }
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

                if(val == "Red") { console.log("Red won!"); }
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

                if(val == "Red") { console.log("Red won!"); }
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
    let buttonRed = document.getElementById("red-button");
    let buttonYellow = document.getElementById("yellow-button");
    buttonRed.disabled = true;
    buttonYellow.disabled = true;
}