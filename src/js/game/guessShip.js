import {
   updatePlacementGridDisplay,
   updateEnemyGuessGridDisplay,
} from "./grid/grid-display";

export function guessShip(player1, player2, turnText = "") {
   return new Promise((resolve) => {
      const body = document.querySelector("body");
      body.innerHTML = "";

      let hasGuessed = false;

      //Informs which player has to guess
      const currentTurnText = document.createElement("p");
      currentTurnText.id = "current-turn";
      currentTurnText.textContent = `${turnText}: Guess a coordinate to attack`;

      //Finish turn
      const finishTurnButton = document.createElement("button");
      finishTurnButton.id = "sub";
      finishTurnButton.textContent = "Finish Turn";
      finishTurnButton.addEventListener("click", () => {
         if (hasGuessed) {
            resolve();
         } else {
            console.log("error");
            errorText.style.display = "block";
            errorText.textContent =
               "Choose a coordinate to attack before finishing turn";
         }
      });

      const errorText = document.createElement("p");
      errorText.id = "error-text";

      //Container for grids
      const gridsContainer = document.createElement("div");
      gridsContainer.id = "guessing-grids";

      //Display player placed ships and enemys misses
      const playerPlacementsGrid = document.createElement("div");
      playerPlacementsGrid.id = "player-placement-grid";
      playerPlacementsGrid.classList.add("grid");
      for (let i = 0; i < 10; i++) {
         for (let j = 0; j < 10; j++) {
            const node = document.createElement("p");
            node.id = `row-${i + 1} column-${j + 1}`;
            node.classList.add("grid-item");
            playerPlacementsGrid.append(node);
         }
      }

      //Display enemy guess board showing current players attacked ships/misses
      const enemyGuessGrid = document.createElement("div");
      enemyGuessGrid.id = "enemy-guess-grid";
      enemyGuessGrid.classList.add("grid");
      for (let i = 0; i < 10; i++) {
         for (let j = 0; j < 10; j++) {
            const node = document.createElement("p");
            node.id = `enemy: row-${i + 1} column-${j + 1}`;
            node.classList.add("grid-item", "guess-item");
            node.addEventListener("click", () => {
               //If player has not guessaed already update enemyGuessGrid with attack
               if (!hasGuessed) {
                  errorText.style.display = "none";

                  const result = player2.gameBoard.receieveAttack([i, j]);

                  hasGuessed = true;
                  updateEnemyGuessGridDisplay(player2);

                  if (result === "game over") {
                     resolve("win");
                  }
               }
            });
            enemyGuessGrid.append(node);
         }
      }

      gridsContainer.append(playerPlacementsGrid, enemyGuessGrid);
      body.append(currentTurnText, finishTurnButton, errorText, gridsContainer);

      //Load playerPlacementsGrid ships and enemyGuessGrid guesses after grid is added to DOM
      updatePlacementGridDisplay(player1);
      updateEnemyGuessGridDisplay(player2);
   });
}
