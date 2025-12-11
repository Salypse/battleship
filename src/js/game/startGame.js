import { Player } from "../player/player.js";
import { placeShips } from "./placeShip.js";

export function startGame(type) {
   switch (type) {
      case "pvp":
         const player1 = new Player("player");
         const player2 = new Player("player");

         placeShips(player1);
         break;

      case "pve":
         console.log("pve");
         break;
   }
}
