import { Player } from "../player/player.js";
import { placeShips } from "./placeShip.js";
import { guessShip } from "./guessShip.js";
import { gameOverScreen } from "./gameOverScreen.js";
import { passScreen } from "./passScreen.js";

export async function startGame(type) {
   let currentTurn = 0;
   let result = "";

   switch (type) {
      case "pvp":
         const player1 = new Player("player");
         const player2 = new Player("player");

         //Placement phase
         //Wait for player to press submit button before continuing to next player
         await placeShips(player1, "Player 1");
         await placeShips(player2, "Player 2");

         //Guessing phase

         //WHen Result is "win" end game
         while (result !== "win") {
            if (currentTurn === 0) {
               result = await guessShip(player1, player2, "Player 1");
               await passScreen();
               currentTurn = 1;
            } else {
               result = await guessShip(player2, player1, "Player 2");
               await passScreen();
               currentTurn = 0;
            }
         }

         gameOverScreen();
         break;

      case "pve":
         const player = new Player("player");
         const computer = new Player("computer");

         //Placement Phase
         await placeShips(player, "Player");
         computer.gameBoard.placeShipsRandomly();

         //Guessing Phase
         while (result !== "win" && result !== "game over") {
            if (currentTurn === 0) {
               result = await guessShip(player, computer, "Player");
               currentTurn = 1;
            } else {
               //If random coordinate has already been guessed try another coordinate
               const tryCoordinateAttack = () => {
                  const randomX = Math.floor(Math.random() * 10);
                  const randomY = Math.floor(Math.random() * 10);

                  if (player.gameBoard.grid[randomX][randomY].isHit) {
                     return tryCoordinateAttack();
                  } else {
                     return player.gameBoard.receieveAttack([randomX, randomY]);
                  }
               };

               result = tryCoordinateAttack();
               currentTurn = 0;
            }
         }

         gameOverScreen();
         break;
   }
}
