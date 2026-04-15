let currentPlayer = "X";
let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");
let gameActive = true;
let mode = "player";

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(cell, index));
});

function setMode(selectedMode){
  mode = selectedMode;
  resetGame();
}

function handleClick(cell, index) {
  if (cell.textContent !== "" || !gameActive) return;

  playMove(cell, index);

  if (mode === "ai" && gameActive && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function playMove(cell, index){
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `🎉 اللاعب ${currentPlayer} فاز!`;
    gameActive = false;
    return;
  }

  if ([...cells].every(c => c.textContent !== "")) {
    statusText.textContent = "تعادل 😅";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `دور اللاعب ${currentPlayer}`;
}

function aiMove(){
  let emptyCells = [...cells].filter(c => c.textContent === "");
  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  playMove(randomCell);
}

function checkWinner() {
  return winPatterns.some(pattern => {
    return pattern.every(i => cells[i].textContent === currentPlayer);
  });
}

function resetGame() {
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "دور اللاعب X";
}