// Emelly Torres
// Project 3: Tic Tac Toe
// Problem 1: Two Player
// Web Development

const canvas = document.getElementById("gameCanvas"); // canvas
const ctx = canvas.getContext("2d"); //2d graphics context
const statusText = document.getElementById("status"); //player turn status
const resetButton = document.getElementById("resetButton"); //reset game

const CELL_SIZE = 200;

//game board state for 9 slots
let board = [
    "", "", "",
    "", "", "",
    "", "", ""
]

let currentPlayer = "X"; //Player turns status indicator set to "X" by default
let winner = null;  //Declare winner flag, and set to null

//moveCount
let moveCount = 0;

//draw the board
drawBoard();

//Set up function to respond to mouseclick
canvas.addEventListener("click", handleClick);

//Set up functionto respond to a clikc on the reset gamebutton
resetButton.addEventListener("click", resetGame)

// First thing to do is draw the game board
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawGrid(); // Draw Grid
    drawPieces(); // Draw game pieces, in this case Xs and Os
}

//this handles what happens when a click occurs
function handleClick(event){
    if(winner){
        return; //gameover
    }

    const rect = canvas.getBoundingClientRect(); //creates canvas?
    const mouseX = event.clientX - rect.left; //mouse x coordinate 
    const mouseY = event.clientY - rect.top; //mouse y coordinate
    const col = Math.floor(mouseX / CELL_SIZE); //col 0, 1, or 2?
    const row = Math.floor(mouseY / CELL_SIZE); //col 0, 1, or 2?
    const index = row * 3 + col; //compute index for board

    if (board[index] !== "") { // if board cell not empty
    return; // then return
    }

    board[index] = currentPlayer; // put "X" or "O“ at board position index
    
    moveCount += 1; // increase with each move

    winner = checkWinner(); // call method to check if a winner exists
    
    if (winner) {
        statusText.textContent = `${winner} Wins!`;
    } else if (moveCount === 9) {
        statusText.textContent = "It's a Tie!";
        winner = "Tie";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer} Turn`;
    }

    drawBoard();
}

//build up indexes
function checkWinner() {

    const lines = [
        //handles horizontals
        [0,1,2],
        [3,4,5],
        [6,7,8],

        //handles columns
        [0,3,6],
        [1,4,7],
        [2,5,8],

        //handles diagonals 
        [0,4,8],
        [2,4,6]

    ];


//check if there is a winner
//check eahc possible winning line
for(const line of lines){
        //extract the three board indexes from current winning line
        const [a, b, c] =line;

        //a win occurs when: first square is not empty AND all three squres are the same symbol
        if(board[a] && board[a] === board[b] && board[b] === board[c])
        {
            return board[a];
        }
    }

    return null;
}

//reset button
function resetGame() {

    //new board
    board = [
    "", "", "",
    "", "", "",
    "", "", ""
    ];

    currentPlayer = "X"; // player X goes first
    winner = null; // winner is null

    moveCount = 0;

    statusText.textContent = "Player X Turn"; // change DOM
    
    drawBoard(); // draw the board
}

//draw stuff in 2d
function drawGrid() {
    ctx.lineWidth = 4; // line width = 4 px
    ctx.strokeStyle = "#A8B58A";
    ctx.beginPath(); // define a new path
    ctx.moveTo(200, 0); // line 1 start point
    ctx.lineTo(200, 600); // line 1 end point
    ctx.moveTo(400, 0); // line 2 start point
    ctx.lineTo(400, 600); // line 2 end point
    ctx.moveTo(0, 200); // line 3 start point
    ctx.lineTo(600, 200); // line 3 end point
    ctx.moveTo(0, 400); //lLine 4 start point
    ctx.lineTo(600, 400); // line 4 end point
    ctx.stroke(); // draws the lines

}

//draw game pieces
function drawPieces() {
    for (let i = 0; i < board.length; i++) {
        const row = Math.floor(i / 3); // Round down (0 – 2)
        const col = i % 3; // (0 – 2)
        // (x,y) is top-left corner of cell
        const x = col * CELL_SIZE;
        const y = row * CELL_SIZE;

        if (board[i] === "X") {
        drawX(x, y);
        }
        
        if (board[i] === "O") {
        drawO(x, y);
        }
    }
}

function drawX(x, y) {
    ctx.strokeStyle = "#d77c7c"
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x + 30, y + 30); // Line 1 start point
    ctx.lineTo(x + 170, y + 170); // Line 1 end point
    ctx.moveTo(x + 170, y + 30); // Line 2 start point
    ctx.lineTo(x + 30,y + 170); // Line 2 end point
    ctx.stroke();
}

function drawO(x, y) {
    ctx.strokeStyle = "#a34a4a";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(x + 100, y + 100, 70, 0, Math.PI * 2);
    ctx.stroke();
}
