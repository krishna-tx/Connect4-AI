class Connect4Player {
    constructor(myPiece, oppPiece) {
        this.myPiece = myPiece;
        this.oppPiece = oppPiece;
    }

    getNextStates(currState, piece) {
        let nextStates = [];
        for(let j = 0; j < 7; j++) {
            let row = -1;
            for(let i = 5; i >= 0; i--) {
                row = -1;
                if(currState[i][j] == '') { // check if cell is free
                    row = i;
                    break; // everything cell with row <= i is also free
                }
            }
            if(row >= 0 && currState[row][j] == '') {
                let copy = currState.map(function(arr) {
                    return arr.slice();
                });
                copy[row][j] = piece;
                nextStates.push(copy);
            }
        }
        return nextStates;
    }

    gameValue(currState) {
        // check rows
        for(let i = 0; i < 6; i++) {
            for(let j = 0; j < 4; j++) {
                let val = currState[i][j];
                if(val != '' && val == currState[i][j+1] && val == currState[i][j+2] && val == currState[i][j+3]) {
                    if(val == this.myPiece) { return 1; } // Winning state
                    return -1; // Losing state
                }
            }
        }

        // check columns
        for(let j = 0; j < 7; j++) {
            for(let i = 0; i < 3; i++) {
                let val = currState[i][j];
                if(val != '' && val == currState[i+1][j] && val == currState[i+2][j] && val == currState[i+3][j]) {
                    if(val == this.myPiece) { return 1; } // Winning state
                    return -1; // Losing state
                }
            }
        }

        // check \ diagonal
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 4; j++) {
                let val = currState[i][j];
                if(val != '' && val == currState[i+1][j+1] && val == currState[i+2][j+2] && val == currState[i+3][j+3]) {
                    if(val == this.myPiece) { return 1; } // Winning state
                    return -1; // Losing state
                }
            }
        }

        // check / diagonal
        for(let i = 0; i < 3; i++) {
            for(let j = 3; j < 7; j++) {
                let val = currState[i][j];
                if(val != '' && val == currState[i+1][j-1] && val == currState[i+2][j-2] && val == currState[i+3][j-3]) {
                    if(val == this.myPiece) { return 1; } // Winning state
                    return -1; // Losing state
                }
            }
        }

        for(let i = 0; i < 6; i++) {
            for(let j = 0; j < 7; j++) {
                if(currState[i][j] == '') { // empty cell exists
                    return 2; // state is not a terminal state
                }
            }
        }

        return 0; // draw
    }

    heuristicGameValue(currState) {
        let myScore = 0, oppScore = 0;

        // check rows
        for(let i = 0; i < 6; i++) {
            for(let j = 0; j < 4; j++) {
                let myCount = 0; // number of my pieces
                let oppCount = 0; // number of opponent pieces
                for(let k = 0; k < 4; k++) {
                    myCount += (currState[i][j+k] == this.myPiece);
                    oppCount += (currState[i][j+k] == this.oppPiece);
                }
                if(myCount == 0) { oppScore += oppCount; }
                else if(oppCount == 0) { myScore += myCount; }
            }
        }

        // check columns
        for(let j = 0; j < 7; j++) {
            for(let i = 0; i < 3; i++) {
                let myCount = 0; // number of my pieces
                let oppCount = 0; // number of opponent pieces
                for(let k = 0; k < 4; k++) {
                    myCount += (currState[i+k][j] == this.myPiece);
                    oppCount += (currState[i+k][j] == this.oppPiece);
                }
                if(myCount == 0) { oppScore += oppCount; }
                else if(oppCount == 0) { myScore += myCount; }
            }
        }

        // check \ diagonal
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 4; j++) {
                let myCount = 0; // number of my pieces
                let oppCount = 0; // number of opponent pieces
                for(let k = 0; k < 4; k++) {
                    myCount += (currState[i+k][j+k] == this.myPiece);
                    oppCount += (currState[i+k][j+k] == this.oppPiece);
                }
                if(myCount == 0) { oppScore += oppCount; }
                else if(oppCount == 0) { myScore += myCount; }
            }
        }

        // check / diagonal
        for(let i = 0; i < 3; i++) {
            for(let j = 3; j < 7; j++) {
                let myCount = 0; // number of my pieces
                let oppCount = 0; // number of opponent pieces
                for(let k = 0; k < 4; k++) {
                    myCount += (currState[i+k][j-k] == this.myPiece);
                    oppCount += (currState[i+k][j-k] == this.oppPiece);
                }
                if(myCount == 0) { oppScore += oppCount; }
                else if(oppCount == 0) { myScore += myCount; }
            }
        }

        let heuristicScore = (myScore - oppScore) / 300; // heuristic score
        return heuristicScore
    }

    maxValue(currState, alpha, beta, depth, initialCall = false) {
        // check if currState is a terminal (ending state)
        let gameValue = this.gameValue(currState)
        if(gameValue != 2) {
            return gameValue;
        }

        // max tree depth reached => evaluate currState
        if(depth == 0) {
            return this.heuristicGameValue(currState);
        }

        let nextStates = this.getNextStates(currState, this.myPiece); // get children
        let maxVal = Number.NEGATIVE_INFINITY;
        let val, maxNextState;
        for(let i = 0; i < nextStates.length; i++) {
            val = this.minValue(nextStates[i], alpha, beta, depth-1);
            if(maxVal < val) {
                maxVal = val;
                maxNextState = nextStates[i];
            }
            alpha = Math.max(alpha, maxVal);
            if(alpha >= beta) { break; } // minimax tree pruning
        }
        if(initialCall) { return [maxVal, maxNextState]; }
        return maxVal;
    }

    minValue(currState, alpha, beta, depth, initialCall = false) {
        // check if currState is a terminal (ending state)
        let gameValue = this.gameValue(currState)
        if(gameValue != 2) {
            return gameValue;
        }

        // max tree depth reached => evaluate currState
        if(depth == 0) {
            return this.heuristicGameValue(currState);
        }

        let nextStates = this.getNextStates(currState, this.oppPiece); // get children
        let minVal = Number.POSITIVE_INFINITY;
        let val, minNextState;;
        for(let i = 0; i < nextStates.length; i++) {
            val = this.maxValue(nextStates[i], alpha, beta, depth-1);
            if(minVal > val) {
                minVal = val;
                minNextState = nextStates[i];
            }
            beta = Math.min(beta, minVal);
            if(alpha >= beta) { break; } // minimax tree pruning
        }
        if(initialCall) { return [minVal, minNextState]; }
        return minVal;
    }

    findIdx(currState, nextState) {
        for(let i = 0; i < 6; i++) {
            for(let j = 0; j < 7; j++) {
                if(currState[i][j] != nextState[i][j]) { return j; }
            }
        }
    }

    makeMove(currState) {
        // don't allow human to make move while computer is moving
        let columns = document.getElementsByClassName("column");
        for(let i = 0; i < columns.length; i++) { columns[i].style.pointerEvents = "none"; }

        // calculate best move using minimax algorithm
        let [maxVal, maxNextState] = this.maxValue(currState, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 7, true);

        let j = this.findIdx(currState, maxNextState); // find column to place move
        let column = document.getElementById(j);

        // put a delay before placing move for visibility
        setTimeout(function() {
            column.click(); // click on the cell
            for(let i = 0; i < columns.length; i++) { columns[i].style.pointerEvents = "auto"; } // allow moves
        }, 500);
        
    }
}