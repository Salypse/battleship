import { Player } from "../player/player.js";
import { placeShips } from "./placeShip.js";
import { guessShip } from "./guessShip.js";
import { gameOverScreen } from "./gameOverScreen.js";

export async function startGame(type) {
   switch (type) {
      case "pvp":
         const player1 = new Player("player");
         const player2 = new Player("player");

         //Placement phase
         //Wait for player to press submit button before continuing to next player
         await placeShips(player1, "Player 1");
         await placeShips(player2, "Player 2");

         //Guessing phase
         let currentTurn = 0;
         let result = "";

         //WHen Result is "win" end game
         while (result !== "win") {
            if (currentTurn === 0) {
               result = await guessShip(player1, player2, "Player 1");
               currentTurn = 1;
            } else {
               result = await guessShip(player2, player1, "Player 2");
               currentTurn = 0;
            }
         }

         gameOverScreen();
         break;

      case "pve":
         console.log("pve");
         break;
   }
}
