// initialize global variables
var currPlayer = "red";
var redPlayer = "human", yellowPlayer = "human";
var availableRow = [5, 5, 5, 5, 5, 5, 5];
var boardMatrix = [];
var player;
var backgroundColor = "rgb(104, 186, 233)";
var defaultCellBackgroundColor = "white";
var defaultCellBorderColor = "lightseagreen";
var endCellBorderColor = "black";

window.onload = function() { // calls setup() function when window is loaded
    setup();
}

/**
 * setup method that is used to build the board automatically and calls the 
 * clearBoard method to have it ready to be used.
 */
function setup() {
    // columns
    let board = document.getElementById("board");
    for(let j = 0; j < 7; j++) {
        let column = document.createElement("div");
        column.id = j;
        column.classList.add("column"); // add column class
        board.append(column); // add column to the board
    }

    // cells
    for(let i = 0; i < 6; i++) {
        let arr = []
        for(let j = 0; j < 7; j++) {
            let column = document.getElementById(j);
            let cell = document.createElement("div");
            cell.id = i + "-" + j;
            cell.classList.add("cell"); // add cell class
            column.append(cell); // add cell to the appropriate column
            arr.push('');
        }
        boardMatrix.push(arr);
    }

    let turnCell = document.getElementById("turn-cell");
    turnCell.classList.add("cell");

    clearBoard();
}

/**
 * function that is used to assign the red player as human or computer based on the what was selected
 */
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

/**
 * function that is used to assign the yellow player as human or computer based on the what was selected
 */
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

/**
 * function that clears the board so that the game can be restarted
 */
function clearBoard() {
    assignRedPlayer();
    assignYellowPlayer();

    currPlayer = "red";
    availableRow = [5, 5, 5, 5, 5, 5, 5];

    // reset cell properties to the default
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
            boardMatrix[i][j] = '';
            let cell = document.getElementById(i + "-" + j);
            cell.style.backgroundColor = defaultCellBackgroundColor;
            cell.style.borderColor = defaultCellBorderColor;
        }
    }

    // enable Start Game Button
    let startGameButton = document.getElementById("start-button")
    startGameButton.disabled = false;

    // show start text
    let startText = document.getElementById("start-text");
    startText.style.display = "block";

    // hide end text
    let endText = document.getElementById("end-text");
    endText.style.display = "none";

    // enable player selectors
    let redPlayerSelector = document.getElementById("red-player-selector");
    let yellowPlayerSelector = document.getElementById("yellow-player-selector");
    redPlayerSelector.disabled = false;
    yellowPlayerSelector.disabled = false;

    // hide the cell that indicates whose turn it is
    let turnCell = document.getElementById("turn-cell");
    turnCell.style.display = "none";

    // reset the background color of screen
    document.body.style.backgroundColor = backgroundColor;

    // disable board
    disableBoard();
}

/**
 * function that disables the board so the player(s) cannot click on it - usually during the end of a game
 */
function disableBoard() {
    let columns = document.getElementsByClassName("column");
    for(let i = 0; i < columns.length; i++) {
        columns[i].removeEventListener("click", placeMove); // don't listen for clicks
    }
}

/**
 * function to start the game - called when "Start Button" is clicked
 */
function startGame() {
    let columns = document.getElementsByClassName("column");
    for(let i = 0; i < columns.length; i++) {
        columns[i].addEventListener("click", placeMove); // listen for clicks
    }

    // disable Start Game Button
    let startGameButton = document.getElementById("start-button")
    startGameButton.disabled = true;

    // hide start text
    let startText = document.getElementById("start-text");
    startText.style.display = "none";

    // disable player selectors
    let redPlayerSelector = document.getElementById("red-player-selector");
    let yellowPlayerSelector = document.getElementById("yellow-player-selector");
    redPlayerSelector.disabled = true;
    yellowPlayerSelector.disabled = true;

    // set color of cell that indicates whose turn it is
    let turnCell = document.getElementById("turn-cell");
    turnCell.style.display = "block";
    turnCell.style.backgroundColor = currPlayer;

    // red player makes move initially if it is being played by the computer
    if(redPlayer != "human") { redPlayer.makeMove(boardMatrix); }
}

/**
 * method that is called when the game is over
 * @param {*} result - tells the outcome of the terminal state (who won or if it is a draw)
 */
function endGame(result) {
    // hide the cell that indicates whose turn it is
    let turnCell = document.getElementById("turn-cell");
    turnCell.style.display = "none";

    // show end text
    let endText = document.getElementById("end-text");
    endText.style.display = "block";

    // set the background color of screen to the winning color
    if(result == "red") { document.body.style.backgroundColor = "red"; }
    else if(result == "yellow") { document.body.style.backgroundColor = "yellow"; }
    else { document.body.style.backgroundColor = "gray"; }

    disableBoard();
}

/**
 * method that is used to modify the ui to show that a move has been placed
 */
function placeMove() {
    // get the row and col of the cell that now contains the new piece
    let row, col;
    col = parseInt(this.id);
    row = availableRow[col];
    
    if(row < 0) { return; } // column already filled => don't place move
    availableRow[col]--;

    // modify cell properties to reflect piece being placed
    let cell = document.getElementById(row + "-" + col);
    cell.style.backgroundColor = currPlayer;
    boardMatrix[row][col] = currPlayer;
    
    // change the variable that keeps track of whose turn it is
    if(currPlayer == "red") { currPlayer = "yellow"; }
    else { currPlayer = "red"; }

    // set color of cell that indicates whose turn it is
    let turnCell = document.getElementById("turn-cell");
    turnCell.style.backgroundColor = currPlayer;

    checkState(); // check to see if the game has ended
}

/**
 * function that checks if the game has ended (terminal state)
 */
function checkState() {
    // check rows
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 4; j++) {
            let val = boardMatrix[i][j];
            if(val != '' && val == boardMatrix[i][j+1] && val == boardMatrix[i][j+2] && val == boardMatrix[i][j+3]) {
                // get the 4 cells in the window
                let cell1 = document.getElementById(i + "-" + j);
                let cell2 = document.getElementById(i + "-" + (j+1));
                let cell3 = document.getElementById(i + "-" + (j+2));
                let cell4 = document.getElementById(i + "-" + (j+3));

                let cells = [cell1, cell2, cell3, cell4];
                for(let i = 0; i < 4; i++) {
                    cells[i].style.borderColor = endCellBorderColor;
                }

                if(val == "red") { endGame("red"); }
                else { endGame("yellow"); }
                return;
            }
        }
    }

    // check columns
    for(let j = 0; j < 7; j++) {
        for(let i = 0; i < 3; i++) {
            let val = boardMatrix[i][j];
            if(val != '' && val == boardMatrix[i+1][j] && val == boardMatrix[i+2][j] && val == boardMatrix[i+3][j]) {
                // get the 4 cells in the window
                let cell1 = document.getElementById(i + "-" + j);
                let cell2 = document.getElementById((i+1) + "-" + j);
                let cell3 = document.getElementById((i+2) + "-" + j);
                let cell4 = document.getElementById((i+3) + "-" + j);

                let cells = [cell1, cell2, cell3, cell4];
                for(let i = 0; i < 4; i++) {
                    cells[i].style.borderColor = endCellBorderColor;
                }

                if(val == "red") { endGame("red"); }
                else { endGame("yellow"); }
                return;
            }
        }
    }

    // check \ diagonal
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 4; j++) {
            let val = boardMatrix[i][j];
            if(val != '' && val == boardMatrix[i+1][j+1] && val == boardMatrix[i+2][j+2] && val == boardMatrix[i+3][j+3]) {
                // get the 4 cells in the window
                let cell1 = document.getElementById(i + "-" + j);
                let cell2 = document.getElementById((i+1) + "-" + (j+1));
                let cell3 = document.getElementById((i+2) + "-" + (j+2));
                let cell4 = document.getElementById((i+3) + "-" + (j+3));

                let cells = [cell1, cell2, cell3, cell4];
                for(let i = 0; i < 4; i++) {
                    cells[i].style.borderColor = endCellBorderColor;
                }

                if(val == "red") { endGame("red"); }
                else { endGame("yellow"); }
                return;
            }
        }
    }

    // check / diagonal
    for(let i = 0; i < 3; i++) {
        for(let j = 3; j < 7; j++) {
            let val = boardMatrix[i][j];
            if(val != '' && val == boardMatrix[i+1][j-1] && val == boardMatrix[i+2][j-2] && val == boardMatrix[i+3][j-3]) {
                // get the 4 cells in the window
                let cell1 = document.getElementById(i + "-" + j);
                let cell2 = document.getElementById((i+1) + "-" + (j-1));
                let cell3 = document.getElementById((i+2) + "-" + (j-2));
                let cell4 = document.getElementById((i+3) + "-" + (j-3));

                let cells = [cell1, cell2, cell3, cell4];
                for(let i = 0; i < 4; i++) {
                    cells[i].style.borderColor = endCellBorderColor;
                }

                if(val == "red") { endGame("red"); }
                else { endGame("yellow"); }
                return;
            }
        }
    }

    // check for draw
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
            if(boardMatrix[i][j] == '') { // empty cell exists
                if(currPlayer == "red" && redPlayer != "human") { redPlayer.makeMove(boardMatrix); }
                else if(currPlayer == "yellow" && yellowPlayer != "human") { yellowPlayer.makeMove(boardMatrix); }
                return; 
            }
        }
    }

    // all cells filled but no winner => game is draw
    endGame("draw");
}