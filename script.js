document.addEventListener("DOMContentLoaded", function() {
    const gameScreen = document.getElementById('gameScreen');
    const resultScreen = document.getElementById('resultScreen');
    const resultMessage = document.getElementById('resultMessage');
    const newGameButton = document.getElementById('newGameButton');
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');
    
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
        if (boardState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
    
        boardState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.style.color = currentPlayer === 'X' ? '#2196F3' : '#f44336';
    
        if (checkWin()) {
            endGame(`Player ${currentPlayer} has won!`);
            return;
        }
    
        if (checkDraw()) {
            endGame('Game is a draw!');
            return;
        }
    
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    function checkWin() {
        return winPatterns.some((pattern) => {
            return pattern.every((index) => {
                return boardState[index] === currentPlayer;
            });
        });
    }
    
    function checkDraw() {
        return boardState.every((cell) => {
            return cell !== '';
        });
    }
    
    function endGame(message) {
        gameActive = false;
        resultMessage.textContent = message;
        resultScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');
    }
    
    function startNewGame() {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        resultScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        status.textContent = `Player ${currentPlayer}'s turn`;
        board.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    }
    
    resetButton.addEventListener('click', startNewGame);
    newGameButton.addEventListener('click', startNewGame);
    
    // Dynamically create cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
});