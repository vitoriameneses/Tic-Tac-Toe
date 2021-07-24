const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell");

const xSymbol = "×";
const oSymbol = "●";

let gameIsLive = true;
let xIsNext = true;
let winner = null;

const letterToSymbol = (letter) => (letter === "x" ? xSymbol : oSymbol);
const handleWin = (letter) => {
  gameIsLive = false;
  winner = letter;
  if (winner === "x") {
    statusDiv.innerHTML = `${letterToSymbol(winner)} ganhou!`;
  } else {
    statusDiv.innerHTML = `<span>${letterToSymbol(winner)} ganhou!</span>`;
  }
};
const checkGameStatus = () => {
  const topLeft = cellDivs[0].classList[2]; // dira se é um x ou um o
  const topMidlle = cellDivs[1].classList[2];
  const topRight = cellDivs[2].classList[2];
  const middleLeft = cellDivs[3].classList[2];
  const middleMiddle = cellDivs[4].classList[2];
  const middleRight = cellDivs[5].classList[2];
  const bottomLeft = cellDivs[6].classList[2];
  const bottomMiddle = cellDivs[7].classList[2];
  const bottomRight = cellDivs[8].classList[2];

  //possibilidades de vencer
  //verticais
  if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft);
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight);
  } else if (
    topMidlle &&
    topMidlle === middleMiddle &&
    topMidlle === bottomMiddle
  ) {
    handleWin(topMidlle);
  }
  //horizontais
  else if (topLeft && topLeft === topMidlle && topLeft === topRight) {
    handleWin(topLeft);
  } else if (
    middleLeft &&
    middleLeft === middleMiddle &&
    middleLeft === middleRight
  ) {
    handleWin(middleLeft);
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft === bottomRight
  ) {
    handleWin(bottomLeft);
  }
  //diagonais
  else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight);
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft);
  }
  //se empatar? quando empata?
  else if (
    topLeft &&
    topMidlle &&
    topRight &&
    middleLeft &&
    middleMiddle &&
    middleRight &&
    bottomLeft &&
    bottomMiddle &&
    bottomRight
  ) {
    gameIsLive = false;
    statusDiv.innerHTML = "Deu velha!";
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      statusDiv.innerHTML = `${xSymbol} é o próximo`;
    } else {
      statusDiv.innerHTML = `<span>${oSymbol} é o próximo</span>`;
    }
  }
};
//event Handlers
const handleReset = () => {
  xIsNext = true;
  statusDiv.innerHTML = `${xSymbol} é o próximo`;
  winner = null;
  //percorrer todas as 9 células e remover o X ou o O delas
  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove("x");
    cellDiv.classList.remove("o");
  }
};
const handleCellClick = (e) => {
  const classList = e.target.classList;
  const location = classList[1];
  if (classList[2] === "x" || classList[2] === "o") return;
  if (xIsNext) {
    classList.add("x");
    checkGameStatus();
  } else {
    classList.add("o");
    checkGameStatus();
  }
};
resetDiv.addEventListener("click", handleReset);
for (const cellDiv of cellDivs) {
  cellDiv.addEventListener("click", handleCellClick);
}
