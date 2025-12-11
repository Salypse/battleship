import { Ship } from "../ship/ship.js";

export class Gameboard {
   constructor() {
      this.gameBoard = this.emptyGameBoard();

      this.rotateShip = false;
      this.placedShips = [];
   }

   placeShip(coordinate, ship) {
      //Find cells ship will be placed on
      const cellsToPlace = this.findCells(coordinate, ship.length);
      if (this.isValidCells(cellsToPlace)) {
         //Place ship in gameboard
         for (let cell of cellsToPlace) {
            const x = cell[0];
            const y = cell[1];

            this.gameBoard[x][y].ship = ship;
         }
         this.placedShips.push(ship);
      } else {
         throw new Error();
      }
   }

   placeShipsRandomly() {
      this.emptyGameBoard();

      const shipsToPlace = [
         new Ship(5),
         new Ship(4),
         new Ship(3),
         new Ship(3),
         new Ship(2),
      ];

      const tryShipPlacement = (ship) => {
         const randomX = Math.floor(Math.random() * 10);
         const randomY = Math.floor(Math.random() * 10);

         //If placeShip [randomX,randomY] returns false (one of the cells had a ship) choose another location
         try {
            this.placeShip([randomX, randomY], ship);
         } catch {
            tryShipPlacement(ship);
         }
      };

      for (let ship of shipsToPlace) {
         tryShipPlacement(ship);
         this.rotateShip = Math.random() <= 0.5;
      }
   }

   receieveAttack(coordinate) {
      const x = coordinate[0];
      const y = coordinate[1];

      if (this.gameBoard[x][y].ship !== null) {
         //Check if coordinate was already guessed
         if (this.gameBoard[x][y].isHit !== true) {
            //Update coordinates values
            this.gameBoard[x][y].ship.hit();
            this.gameBoard[x][y].isHit = true;

            if (this.allShipsSunk()) {
               return "game over";
            }
            return true;
         }
         return;
      }
      this.gameBoard[x][y].isHit = false;
      return false;
   }

   findCells(coordinate, length) {
      let x = coordinate[0];
      let y = coordinate[1];

      let cells = [[x, y]];

      while (cells.length < length) {
         if (this.rotateShip === true) {
            cells.push([x, --y]);
         } else {
            cells.push([++x, y]);
         }
      }
      return cells;
   }

   isValidCells(cells) {
      //Check if ship when placed will be out of bounds
      for (let cell of cells) {
         const x = cell[0];
         const y = cell[1];

         //Check if ship when placed will be out of bounds
         if (x < 0 || x >= 10 || y < 0 || y >= 10) {
            return false;
         }

         //Check if any of the cells already have a ship
         if (this.gameBoard[x][y].ship !== null) {
            return false;
         }
      }
      return true;
   }

   allShipsSunk() {
      for (let ship of this.placedShips) {
         //If any ship has not sank game is not over
         if (ship.hasSank === false) {
            return false;
         }
      }
      return true;
   }

   emptyGameBoard() {
      const GRIDSIZE = 10;
      this.gameBoard = Array.from({ length: GRIDSIZE }, () =>
         Array.from({ length: GRIDSIZE }, () => ({
            ship: null,
            isHit: undefined,
         }))
      );
   }
}
