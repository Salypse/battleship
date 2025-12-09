import { Gameboard } from "../gameboard/gameboard.js";

export class Player {
   constructor(type) {
      this.type = type;
      this.gameBoard = new Gameboard();
   }
}
