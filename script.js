
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to check for a win
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
       
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        return 'Draw';
    }

    return null;
}

// Function to handle cell click
function handleCellClick(event) {
    const cellId = event.target.id;
    const cellIndex = parseInt(cellId.split('-')[1]);
    if (gameBoard[cellIndex] || !gameActive) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        if (winner === 'Draw') {
            document.getElementById('info').textContent = "It's a Draw!";
        } else {
            document.getElementById('info').textContent = `${winner} wins!`;
        }
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('info').textContent = `Current player: ${currentPlayer}`;
    }
}

// Function to restart the game
function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('info').textContent = 'Current player: X';

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// Event listeners
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restartGame);
