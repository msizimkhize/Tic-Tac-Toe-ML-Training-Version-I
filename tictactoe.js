const net = new brain.NeuralNetwork();

const trainingData = [
/Default training data
  { input: [1, 1, 0, -1, -1, 0, 0, 0, 0], output: [0, 0, 1, 0, 0, 0, 0, 0, 0] },
  { input: [1, -1, 1, -1, 1, -1, 0, 0, 0], output: [0, 0, 0, 0, 0, 0, 1, 0, 0] },
  { input: [0, 0, 0, -1, -1, 0, 1, 1, 0], output: [0, 0, 0, 0, 0, 0, 0, 0, 1] },
  
  //Training as per diagram
  { input: [1, 0, -1, 1, 0, 0, -1, -1, 1], output: [1, 1, -1, 1, 0, 0, -1, -1, 1]},
  { input: [1, 0, -1, 1, 0, 0, -1, -1, 1], output: [1, 0, -1, 1, 1, 0, -1, -1, 1]},
  { input: [1, 0, -1, 1, 0, 0, -1, -1, 1], output: [1, 0, -1, 1, 0, 1, -1, -1, 1]},
  
  { input: [1, 1, -1, 1, 0, 0, -1, -1, 1], output: [1, 1, -1, 1, -1, 0, -1, -1, 1]},
  { input: [1, 1, -1, 1, 0, 0, -1, -1, 1], output: [1, 1, -1, 1, 0, -1, -1, -1, 1]},
  
  { input: [1, 0, -1, 1, 0, 1, -1, -1, 1], output: [1, 0, -1, 1, -1, 1, -1, -1, 1]},
  { input: [1, 0, -1, 1, 0, 1, -1, -1, 1], output: [1, -1, -1, 1, 0, 1, -1, -1, 1]},
  
  //Training to prevent immediate loss
  {input: [1, 0, 1, -1, 0, 0, 0, 0, 0], output: [1, -1, 1, -1, 0, 0, 0, 0, 0]},
  {input: [1, 0, 1, 0, -1, 0, 0, 0, 0], output: [1, -1, 1, 0, -1, 0, 0, 0, 0]},
  {input: [1, 0, 1, 0, 0, -1, 0, 0, 0], output: [1, -1, 1, 0, 0, -1, 0, 0, 0]}, 
  {input: [1, 0, 1, 0, 0, 0, -1, 0, 0], output: [1, -1, 1, 0, 0, 0, -1, 0, 0]},
  {input: [1, 0, 1, 0, 0, 0, 0, -1, 0], output: [1, -1, 1, 0, 0, 0, 0, -1, 0]},
  {input: [1, 0, 1, 0, 0, 0, 0, 0, -1], output: [1, -1, 1, 0, 0, 0, 0, 0, -1]},  
  
  {input: [1, -1, 0, 0, 0, 0, 1, 0, 0], output: [1, -1, 0, -1, 0, 0, 1, 0, 0]},
  {input: [1, 0, -1, 0, 0, 0, 1, 0, 0], output: [1, 0, -1, -1, 0, 0, 1, 0, 0]},
  {input: [1, 0, 0, 0, -1, 0, 1, 0, 0], output: [1, 0, 0, -1, -1, 0, 1, 0, 0]}, 
  {input: [1, 0, 0, 0, 0, -1, 1, 0, 0], output: [1, 0, 0, -1, 0, -1, 1, 0, 0]},
  {input: [1, 0, 0, 0, 0, 0, 1, -1, 0], output: [1, 0, 0, -1, 0, 0, 1, -1, 0]},
  {input: [1, 0, 0, 0, 0, 0, 1, 0, -1], output: [1, 0, 0, -1, 0, 0, 1, 0, -1]}, 
  
  {input: [-1, 0, 1, 0, 0, 0, 0, 0, 1], output: [-1, 0, 1, 0, 0, -1, 0, 0, 1]},
  {input: [0, -1, 1, 0, 0, 0, 0, 0, 1], output: [0, -1, 1, 0, 0, -1, 0, 0, 1]},
  {input: [0, 0, 1, -1, 0, 0, 0, 0, 1], output: [0, 0, 1, -1, 0, -1, 0, 0, 1]}, 
  {input: [0, 0, 1, 0, -1, 0, 0, 0, 1], output: [0, 0, 1, 0, -1, -1, 0, 0, 1]},
  {input: [0, 0, 1, 0, 0, 0, -1, 0, 1], output: [0, 0, 1, 0, 0, -1, -1, 0, 1]},
  {input: [0, 0, 1, 0, 0, 0, 0, -1, 1], output: [0, 0, 1, 0, 0, -1, 0, -1, 1]}, 
  
  {input: [-1, 0, 0, 0, 0, 0, 1, 0, 1], output: [-1, 0, 0, 0, 0, 0, 1, -1, 1]},
  {input: [0, -1, 0, 0, 0, 0, 1, 0, 1], output: [0, -1, 0, 0, 0, 0, 1, -1, 1]},
  {input: [0, 0, -1, 0, 0, 0, 1, 0, 1], output: [0, 0, -1, 0, 0, 0, 1, -1, 1]}, 
  {input: [0, 0, 0, -1, 0, 0, 1, 0, 1], output: [0, 0, 0, -1, 0, 0, 1, -1, 1]},
  {input: [0, 0, 0, 0, -1, 0, 1, 0, 1], output: [0, 0, 0, 0, -1, 0, 1, -1, 1]},
  {input: [0, 0, 0, 0, 0, -1, 1, 0, 1], output: [0, 0, 0, 0, 0, -1, 1, -1, 1]}, 
  
  {input: [-1, 0, 0, 1, 0, 1, 0, 0, 0], output: [-1, 0, 0, 1, 0, 1, 0, 0, 0]},
  {input: [0, -1, 0, 1, 0, 1, 0, 0, 0], output: [0, -1, 0, 1, 0, 1, 0, 0, 0]},
  {input: [0, 0, -1, 1, 0, 1, 0, 0, 0], output: [0, 0, -1, 1, 0, 1, 0, 0, 0]}, 
  {input: [0, 0, 0, 1, 0, 1, -1, 0, 0], output: [0, 0, 0, 1, 0, 1, -1, 0, 0]},
  {input: [0, 0, 0, 1, 0, 1, 0, -1, 0], output: [0, 0, 0, 1, 0, 1, 0, -1, 0]},
  {input: [0, 0, 0, 1, 0, 1, 0, 0, -1], output: [0, 0, 0, 1, 0, 1, 0, 0, -1]}, 
  
  // These are the diagonal cases
  {input: [1, -1, 0, 0, 0, 0, 0, 0, 1], output: [1, -1, 0, 0, -1, 0, 0, 0, 1]},
  {input: [1, 0, -1, 0, 0, 0, 0, 0, 1], output: [1, 0, -1, 0, -1, 0, 0, 0, 1]},
  {input: [1, 0, 0, -1, 0, 0, 0, 0, 1], output: [1, 0, 0, -1, -1, 0, 0, 0, 1]}, 
  {input: [1, 0, 0, 0, 0, -1, 0, 0, 1], output: [1, 0, 0, 0, -1, -1, 0, 0, 1]},
  {input: [1, 0, 0, 0, 0, 0, -1, 0, 1], output: [1, 0, 0, 0, -1, 0, -1, 0, 1]},
  {input: [1, 0, 0, 0, 0, 0, 0, -1, 1], output: [1, 0, 0, 0, -1, 0, 0, -1, 1]}, 
  
  {input: [-1, 0, 1, 0, 0, 0, 1, 0, 0], output: [-1, 0, 1, 0, -1, 0, 1, 0, 0]},
  {input: [0, -1, 1, 0, 0, 0, 1, 0, 0], output: [0, -1, 1, 0, -1, 0, 1, 0, 0]},
  {input: [0, 0, 1, -1, 0, 0, 1, 0, 0], output: [0, 0, 1, -1, -1, 0, 1, 0, 0]}, 
  {input: [0, 0, 1, 0, 0, -1, 1, 0, 0], output: [0, 0, 1, 0, -1, -1, 1, 0, 0]},
  {input: [0, 0, 1, 0, 0, 0, 1, -1, 0], output: [0, 0, 1, 0, -1, 0, 1, -1, 0]},
  {input: [0, 0, 1, 0, 0, 0, 1, 0, -1], output: [0, 0, 1, 0, -1, 0, 1, 0, -1]},   
];

net.train(trainingData, {
  iterations: 2000,
  log: false,
  errorThresh: 0.005
});

let board = Array(9).fill(0);
let gameOver = false;

function renderBoard() {
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  board.forEach((cell, i) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    cellDiv.dataset.index = i;
    cellDiv.textContent = cell === 1 ? 'X' : cell === -1 ? 'O' : '';
    cellDiv.onclick = () => handlePlayerMove(i);
    boardDiv.appendChild(cellDiv);
  });
}

function handlePlayerMove(index) {
  if (gameOver || board[index] !== 0) return;
  board[index] = 1;
  renderBoard();
  if (checkWinner(1)) {
    document.getElementById('status').textContent = 'You win!';
    gameOver = true;
    return;
  }
  if (board.every(c => c !== 0)) {
    document.getElementById('status').textContent = 'Draw!';
    gameOver = true;
    return;
  }

  setTimeout(aiMove, 500);
}

function aiMove() {
  const prediction = net.run(board);
  let bestMove = prediction.indexOf(Math.max(...prediction));

  while (board[bestMove] !== 0) {
    prediction[bestMove] = 0; // zero it out
    bestMove = prediction.indexOf(Math.max(...prediction));
  }

  board[bestMove] = -1;
  renderBoard();

  if (checkWinner(-1)) {
    document.getElementById('status').textContent = 'AI wins!';
    gameOver = true;
    return;
  }

  if (board.every(c => c !== 0)) {
    document.getElementById('status').textContent = 'Draw!';
    gameOver = true;
    return;
  }

  document.getElementById('status').textContent = "Your turn";
}

function checkWinner(player) {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winCombos.some(combo =>
    combo.every(i => board[i] === player)
  );
}

renderBoard();
