// DOM Elements
const scoreComputer = document.querySelector('.pc-score');
const scorePlayer = document.querySelector('.player-score');

// Player DOM
const playerRock = document.querySelector('#player-rock');
const playerPaper = document.querySelector('#player-paper');
const playerScissors = document.querySelector('#player-scissors');

// Computer DOM
const computerRock = document.querySelector('#computer-rock');
const computerPaper = document.querySelector('#computer-paper');
const computerScissors = document.querySelector('#computer-scissors');

const startGame = document.querySelector('.start-game');

let globalGameCounter = 0;
let playerScore = 0;
let computerScore = 0;

// Game Functions
// Randomize the computers choice
const computerPlay = () => {
  let randomNumber = Math.floor((Math.random() * 3) + 1);
  switch(randomNumber) {
    case 1: 
      computerRock.classList.add('animated');
      setTimeout(() => {
        computerRock.classList.remove('animated');
      },1500)
      return "Rock";
    case 2: 
      computerPaper.classList.add('animated');
      setTimeout(() => {
        computerPaper.classList.remove('animated');
      },1500)
      return "Paper";
    case 3: 
      computerScissors.classList.add('animated');
      setTimeout(() => {
        computerScissors.classList.remove('animated');
      },1500)
      return "Scissors";
  }
}

// Compare the players input with computers choice, also includes winning a round logic.
const playerRound = (playerSelection, computerSelection) => {
  if(playerSelection !== computerSelection) {
    if(playerSelection === "Rock" && computerSelection === "Scissors") {
      playerScore++;
      scorePlayer.innerText = `${playerScore}`;
    } else if(playerSelection === "Paper" && computerSelection === "Rock") {
      playerScore++;
      scorePlayer.innerText = `${playerScore}`;
    } else if(playerSelection === "Scissors" && computerSelection === "Paper") {
      playerScore++;
      scorePlayer.innerText = `${playerScore}`;
    } else {
      computerScore++;
      scoreComputer.innerText = `${computerScore}`;
    }
  } else {
    console.log("Draw!");
    console.log(`Computer Score: ${computerScore}`);
    console.log(`Player Score: ${playerScore}`);
  }
}

const currentLeader = () => {
  if(computerScore > playerScore) {
    scoreComputer.classList.add('winner');
    scorePlayer.classList.remove('winner');
  } else {
    scorePlayer.classList.add('winner');
    scoreComputer.classList.remove('winner');
  }
}

// Event Listeners
playerRock.addEventListener('click', () => {
  playerRound("Rock", computerPlay());
  playerRock.classList.add('animated');  
  globalGameCounter++;
  startGame.innerText = `Games played: ${globalGameCounter}`;
  currentLeader();
  setTimeout(() => {
    playerRock.classList.remove('animated');
  }, 2000);
});

playerPaper.addEventListener('click', () => {
  playerRound("Paper", computerPlay());
  playerPaper.classList.add('animated');  
  globalGameCounter++;
  startGame.innerText = `Games played: ${globalGameCounter}`;
  currentLeader();
  setTimeout(() => {
    playerPaper.classList.remove('animated');
  }, 2000);
});

playerScissors.addEventListener('click', () => {
  playerRound("Scissors", computerPlay());
  playerScissors.classList.add('animated');  
  globalGameCounter++;
  startGame.innerText = `Games played: ${globalGameCounter}`;
  currentLeader();
  setTimeout(() => {
    playerScissors.classList.remove('animated');
  }, 2000);
});