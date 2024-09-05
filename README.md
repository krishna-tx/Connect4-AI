# Connect 4 AI Game

## Link to Project: https://krishna-tx.github.io/Connect4-AI/


<img src="https://github.com/user-attachments/assets/cd37128e-c62b-4a5e-851b-d791b429f373" width="300" height="350"/>


## The Game
The board is modelled after the traditional Connect 4 board with 6x7 cells. The goal is for a player to get 4 pieces in a row either horizontally, vertically, or diagonally by placing pieces in one of the 7 columns. This game supports either Human vs Human or Human vs Computer. The graphics for this game were made using HTML, CSS, and Javascript.

## The AI
The AI (computer playing the game) is achieved using the famous Minimax Algorithm from Game Theory. It assumes that each player is playing in the most optimal way and will look ahead a certain number of moves (in this case 7 moves ahead for a balance of time and performance) to find the best move(s) to make given the current position. The AI follows a strategy where it is encouraged to find moves that result in each 4-cell block only having its own piece and having as many of those pieces in that block as possible. This strategy, along with looking 7 moves ahead makes this AI very difficult to beat, though you are welcome to try.

## Modifications Made Throughout Development Beyond the Game Itself
* Added option selectors for players to choose to be Red/Yellow, play by themselves, or play against the AI.
* Added an indicator to show whose turn it is at the bottom of the game board.
* Added a delay between the AI making turns for visual effects and to simulate the AI "thinking" about the best move to make.

### Resources I Used
* Minimax Algorithm Explanation: https://www.youtube.com/watch?v=l-hh51ncgDI
* Connect 4 Board Design Inspiration: https://www.youtube.com/watch?v=4ARsthVnCTg
