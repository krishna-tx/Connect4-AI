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
                    if(val == this.myPiece) { return 100; } // Winning state
                    return -100; // Losing state
                }
            }
        }

        // check columns
        for(let j = 0; j < 7; j++) {
            for(let i = 0; i < 3; i++) {
                let val = currState[i][j];
                if(val != '' && val == currState[i+1][j] && val == currState[i+2][j] && val == currState[i+3][j]) {
                    if(val == this.myPiece) { return 100; } // Winning state
                    return -100; // Losing state
                }
            }
        }

        // check \ diagonal
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 4; j++) {
                let val = currState[i][j];
                if(val != '' && val == currState[i+1][j+1] && val == currState[i+2][j+2] && val == currState[i+3][j+3]) {
                    if(val == this.myPiece) { return 100; } // Winning state
                    return -100; // Losing state
                }
            }
        }

        // check / diagonal
        for(let i = 0; i < 3; i++) {
            for(let j = 3; j < 7; j++) {
                let val = currState[i][j];
                if(val != '' && val == boardMatrix[i+1][j-1] && val == boardMatrix[i+2][j-2] && val == boardMatrix[i+3][j-3]) {
                    if(val == this.myPiece) { return 100; } // Winning state
                    return -100; // Losing state
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
        // let totalMoves = 0;
        // for(let i = 0; i < 6; i++) {
        //     for(let j = 0; j < 7; j++) {
        //         totalMoves += (currState[i][j] != '');
        //     }
        // }

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

        let heuristicScore = (myScore - oppScore); // heuristic score
        if(Math.abs(heuristicScore) >= 100) { console.log(heuristicScore); }
        return heuristicScore
    }

    maxValue(currState, alpha, beta, depth) {
        let gameValue = this.gameValue(currState)
        if(gameValue != 2) {
            return [gameValue, null];
        }

        if(depth == 0) {
            return [this.heuristicGameValue(currState), null];
        }

        let nextStates = this.getNextStates(currState, this.myPiece);
        let maxVal = Number.NEGATIVE_INFINITY;
        let val, maxNextState, minNextState;
        for(let i = 0; i < nextStates.length; i++) {
            [val, minNextState] = this.minValue(nextStates[i], alpha, beta, depth-1);
            if(maxVal < val) {
                maxVal = val;
                maxNextState = nextStates[i];
            }
            alpha = Math.max(alpha, maxVal);
            if(alpha >= beta) { break; }
        }
        return [maxVal, maxNextState];
    }

    minValue(currState, alpha, beta, depth) {
        let gameValue = this.gameValue(currState)
        if(gameValue != 2) {
            return [gameValue, null];
        }

        if(depth == 0) {
            return [this.heuristicGameValue(currState), null];
        }

        let nextStates = this.getNextStates(currState, this.oppPiece);
        let minVal = Number.POSITIVE_INFINITY;
        let val, maxNextState, minNextState;;
        for(let i = 0; i < nextStates.length; i++) {
            [val, maxNextState] = this.maxValue(nextStates[i], alpha, beta, depth-1);
            if(minVal > val) {
                minVal = val;
                minNextState = nextStates[i];
            }
            beta = Math.min(beta, minVal);
            if(alpha >= beta) { break; }
        }
        return [minVal, minNextState];
    }

    findIdx(currState, nextState) {
        for(let i = 0; i < 6; i++) {
            for(let j = 0; j < 7; j++) {
                if(currState[i][j] != nextState[i][j]) { return j; }
            }
        }
    }

    makeMove(boardMatrix) {
        let currState = boardMatrix.map(function(arr) {
            return arr.slice();
        });
        let [maxVal, nextState] = this.maxValue(currState, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 7);

        if(nextState == null) { console.log("nextState is null"); }

        let j = this.findIdx(currState, nextState);
        let selector = document.getElementById(j);
        selector.click(); // click on that cell
    }
}