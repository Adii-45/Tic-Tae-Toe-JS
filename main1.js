let box = document.querySelectorAll(".box");
let arr = Array.from(box).fill(null);
let winBox = Array.from(box);
let restartBtn = document.getElementById("restart");
let sb = document.querySelector(".scoreBoard");
let clickable = document.querySelector(".container");
let turn;

// Ask player for turn at start
setInitialTurn();

const winSets = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

box.forEach((element) => {
  element.addEventListener("click", (element) => {
    const id = element.target.id;
    if (arr[id] == null) {
      arr[id] = turn;
      element.target.innerText = turn;
      win(); //Win function
      draw(); //Draw function
      turnOver(); //turn over the X and O function
    }
  });
});

//if the turn is X then the next turn will be O;
function turnOver() {
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
}

// Win function
function win() {
  winSets.forEach((element) => {
    if (
      arr[element[0]] === arr[element[1]] &&
      arr[element[1]] === arr[element[2]] &&
      arr[element[0]] !== null
    ) {
      for (let i = 0; i < 3; i++) {
        winBox[element[i]].style.backgroundColor = "rgb(0, 139, 35)";
      }
      sb.innerText = `'${arr[element[0]]}' Wins 🎉`;
      clickable.style.pointerEvents = "none";
    }
  });
}

// Draw function
function draw() {
  if (arr.indexOf(null) === -1) {
    sb.innerText = "Match Drawn 🍪";
    clickable.style.pointerEvents = "none";
  }
}

// Restart button
restartBtn.addEventListener("click", () => {
  arr.fill(null);
  box.forEach((box) => {
    box.innerText = "";
  });

  clickable.style.pointerEvents = "auto";
  sb.innerText = "";
  winBox.forEach((e) => {
    e.style.backgroundColor = "";
  });

  // Ask the player which turn they want
  setInitialTurn();
});

// Prompt for starting turn
function setInitialTurn() {
  let playerChoice = prompt("Choose your turn: X or O");
  playerChoice = playerChoice ? playerChoice.toUpperCase() : "X";
  turn = playerChoice === "X" || playerChoice === "O" ? playerChoice : "X";
}
