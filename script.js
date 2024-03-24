//* Game Modes
let gameMode = "normal"; // Default mode is normal

//* Function to toggle game mode
const toggleGameMode = () => {
  const modeButton = document.querySelector("#modeButton");
  const confirmation = confirm("Switching the mode will reset the score. Are you sure you want to continue?");
  if (confirmation) {
    // Reset scores
    playerScore = 0;
    computerScore = 0;
    updateScoreDisplay();

    // Toggle game mode
    gameMode = gameMode === "normal" ? "impossible" : "normal";
    modeButton.textContent = gameMode === "normal" ? "Normal Mode" : "Impossible Mode";
  }
};

//* Function to set the game mode
const setGameMode = (mode) => {
  gameMode = mode;
};

//* Computer Choice
const getComputerChoice = (playerChoice) => {
  if (gameMode === "normal") {
    // Normal mode: Computer chooses randomly
    const computerRandomChoice = Math.floor(Math.random() * 3) + 1;
    if (computerRandomChoice === 1) return "rock";
    if (computerRandomChoice === 2) return "paper";
    return "scissors";
  } else {
    // Impossible mode: Computer choice based on player's choice
    if (playerChoice === "rock") return "paper"; // Computer chooses paper
    if (playerChoice === "paper") return "scissors"; // Computer chooses scissors
    return "rock"; // Computer chooses rock if player chooses scissors
  }
};

//* Game Value
const determineGameValue = (computerChoice, playerChoice) => {
  if (playerChoice === computerChoice) return "Draw";
  if (playerChoice === "rock") return computerChoice === "paper" ? "Lose" : "Win";
  if (playerChoice === "paper") return computerChoice === "scissors" ? "Lose" : "Win";
  if (playerChoice === "scissors") return computerChoice === "rock" ? "Lose" : "Win";
};

//* Initialize scores
let playerScore = 0;
let computerScore = 0;

const updateScoreDisplay = () => {
  const playerScoreDisplay = document.querySelector("#playerScore p");
  const computerScoreDisplay = document.querySelector("#computerScore p");

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
};

//* Function to update scores
const updateScores = (resultValue) => {
  if (resultValue === "Win") {
    playerScore++;
  } else if (resultValue === "Lose") {
    computerScore++;
  }
  updateScoreDisplay();
};

//* Function to simulate animation delay
const animateComputerChoice = (playerChoice, callback) => {
  const computerDisplay = document.querySelector("#computerDisplay img");
  const choices = ["rock", "paper", "scissors"];
  let index = 0;

  const interval = setInterval(() => {
    computerDisplay.setAttribute("src", `img/${choices[index]}.png`);
    index++;
    if (index === choices.length) index = 0;
  }, 150); // Change interval time as needed

  //* Simulate delay for animation
  setTimeout(() => {
    clearInterval(interval);

    // Get computer's final choice after animation delay
    const computerChoice = getComputerChoice(playerChoice);

    // Pass the final choice to the callback function
    callback(computerChoice);
  }, 1050); // Adjust the delay time as needed
};

//* Add event listener to player choices
const getPlayerChoice = document.querySelectorAll("#optItems img");
getPlayerChoice.forEach(function (playerClick) {
  playerClick.addEventListener("click", function () {
    const playerChoice = playerClick.className;

    // Display player's choice immediately
    const playerDisplay = document.querySelector("#playerDisplay img");
    playerDisplay.setAttribute("src", `img/${playerChoice}.png`);

    // Simulate animation delay for computer's choice
    animateComputerChoice(playerChoice, (computerChoice) => {
      // Display computer's final choice after animation delay
      const computerDisplay = document.querySelector("#computerDisplay img");
      computerDisplay.setAttribute("src", `img/${computerChoice}.png`);

      // Determine game result and update scores
      const resultValue = determineGameValue(computerChoice, playerChoice);
      const result = document.querySelector("#resultValue p");
      result.innerHTML = resultValue;

      updateScores(resultValue);
    });
  });
});

const modeButton = document.querySelector("#modeButton");
modeButton.addEventListener("click", function () {
  toggleGameMode();
});
