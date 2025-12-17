import { startGame } from "./startGame";

export function gameOverScreen() {
   const body = document.querySelector("body");
   body.innerHTML = "";

   const gameOverText = document.createElement("p");
   gameOverText.id = "game-over";
   gameOverText.textContent = "GAME OVER!";

   const statusText = document.createElement("p");
   statusText.id = "status";
   statusText.textContent = "All ships have been sank";

   const newPlayerGameButton = document.createElement("button");
   newPlayerGameButton.id = "new-player-game";
   newPlayerGameButton.textContent = "New Player vs Player Game";
   newPlayerGameButton.addEventListener("click", () => {
      startGame("pvp");
   });

   const newComputerGameButton = document.createElement("button");
   newComputerGameButton.id = "new-computer-game";
   newComputerGameButton.textContent = "New Player vs Computer Game";
   newComputerGameButton.addEventListener("click", () => {
      startGame("pve");
   });

   body.append(
      gameOverText,
      statusText,
      newPlayerGameButton,
      newComputerGameButton
   );
}
