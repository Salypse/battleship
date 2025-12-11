import { Player } from "../player/player.js";
import { placeShips } from "./placeShip.js";

export async function startGame(type) {
   switch (type) {
      case "pvp":
         const player1 = new Player("player");
         const player2 = new Player("player");

         //Placement phase
         //Wait for player to press submit button before continuing to next player
         await placeShips(player1);
         await placeShips(player2);
         break;

      case "pve":
         console.log("pve");
         break;
   }
}
