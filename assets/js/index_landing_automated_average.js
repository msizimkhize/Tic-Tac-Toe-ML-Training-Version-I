let bot;

window.addEventListener('DOMContentLoaded', () => {
    
    if (typeof brain !== 'undefined') {
        bot = new brain.NeuralNetwork();
        bot.train([
            { input: [1, 1, 0, 0, 0, 0, 0, 0, 0], output: {2: 1} },
            { input: [0, 0, 0, 1, 1, 0, 0, 0, 0], output: {5: 1} },

            { input: [1, 0, 0, 1, 0, 0, 0, 0, 0], output: {6: 1} },
            { input: [0, 1, 0, 0, 1, 0, 0, 0, 0], output: {8: 1} },
            { input: [0, 0, 1, 0, 0, 1, 0, 0, 0], output: {0: 1} }
        ]);
    }

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    function encodeBoard(board){
        return board.map(cell => {
            if (cell === 'X') return 1;
            if (cell === 'O') return -1;
            return 0;
        });
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes(''))
            announce(TIE);
    }

	const announce = (type) => {
		const display = document.querySelector('.display'); // Get the turn display
		
		switch(type){
			case PLAYERO_WON:
				display.innerHTML = 'The <span class="playerO">AI</span> Won';
				break;
			case PLAYERX_WON:
				display.innerHTML = 'Player <span class="playerX">X</span> Won';
				break;
			case TIE:
				display.innerText = 'Tie';
		}
	};

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //If currentPlayer is 'X', make it 'O'; otherwise, make it 'X'
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
        
        if(currentPlayer === 'O' && isGameActive){
            setTimeout(() => {
                makeAIMove(); //the AI replacing the move of Player O
            }, 300);
        }
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive && currentPlayer === 'X') {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
	const resetBoard = () => {
		board = ['', '', '', '', '', '', '', '', ''];
		isGameActive = true;
		
		const display = document.querySelector('.display');
		display.innerHTML = 'Turn: Player <span class="display-player playerX">X</span>'; // Restore turn display

		if (currentPlayer === 'O') {
			changePlayer();
		}

		tiles.forEach(tile => {
			tile.innerText = '';
			tile.classList.remove('playerX');
			tile.classList.remove('playerO');
		});
	}
    
    //Implementation of makeAIMove function
    function makeAIMove(){
        if (!isGameActive) return;
        
        let bestIndex = -1;
        
        if (bot) {
            try {
                const encoded = encodeBoard(board);
                const output = bot.run(encoded);
                const moves = Object.entries(output);
                
                //Finding the move with the highest score (by way of brain.js)
                //At the index: if the value for a is greater than that of b, choose a. Otherwise, choose b
                const validMoves = moves.filter(([index]) => board[index] === '');
                
                if (validMoves.length > 0) {
                    [bestIndex] = validMoves.reduce((a, b) => a[1] > b[1] ? a : b);
                }
            } catch (error) {
                console.error('AI error:', error);
            }
        }
        
        if (bestIndex === -1 || board[bestIndex] !== '') {
            const emptyTiles = board.map((cell, idx) => cell === '' ? idx : -1).filter(idx => idx !== -1);
            if (emptyTiles.length > 0) {
                bestIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            }
        }
        
        //The AI can only make a move if the tile is open
        if (bestIndex !== -1 && board[bestIndex] === ''){
            const tile = tiles[bestIndex];
            tile.innerText = 'O';
            tile.classList.add('playerO');
            updateBoard(bestIndex);
            handleResultValidation();
            changePlayer();
        }
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});