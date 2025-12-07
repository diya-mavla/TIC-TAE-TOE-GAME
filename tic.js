let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function play(cell, index) {
  if (board[index] === "" && !gameOver) {
    board[index] = currentPlayer;
    cell.innerText = currentPlayer;

    const winningPattern = checkWinner();
    if (winningPattern) {
      document.getElementById("result").innerText = `${currentPlayer} Wins!`;
      drawLine(winningPattern);
      gameOver = true;
      return;
    }

    if (!board.includes("")) {
      document.getElementById("result").innerText = "Draw!";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  for (let p of winPatterns) {
    let [a, b, c] = p;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return p;
    }
  }
  return null;
}

function drawLine(pattern) {
  const line = document.getElementById("win-line");
  const positions = {
    0: { top: 50, left: 155, rotate: 0, width: 310 },
    1: { top: 155, left: 155, rotate: 0, width: 310 },
    2: { top: 260, left: 155, rotate: 0, width: 310 },
    3: { top: 155, left: 50, rotate: 90, width: 310 },
    4: { top: 155, left: 155, rotate: 90, width: 310 },
    5: { top: 155, left: 260, rotate: 90, width: 310 },
    6: { top: 155, left: 155, rotate: 45, width: 430 },
    7: { top: 155, left: 155, rotate: -45, width: 430 }
  };

  const index = winPatterns.findIndex(w => w.join() === pattern.join());
  const p = positions[index];

  line.style.width = `${p.width}px`;
  line.style.top = `${p.top}px`;
  line.style.left = `${p.left}px`;
  line.style.transform = `translate(-50%, -50%) rotate(${p.rotate}deg)`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;

  document.getElementById("result").innerText = "";
  document.getElementById("win-line").style.width = "0";

  const cells = document.querySelectorAll(".cell");
  cells.forEach(c => c.innerText = "");
}
