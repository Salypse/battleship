export class Gameboard {
   constructor() {
      const GRIDSIZE = 10;
      this.gameBoard = Array.from({ length: GRIDSIZE }, () =>
         Array.from({ length: GRIDSIZE }, () => ({
            ship: null,
            isHit: undefined,
         }))
      );

      this.rotateShip = false;
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
      }
   }

   receieveAttack(coordinate) {
      const x = coordinate[0];
      const y = coordinate[1];

      if (this.gameBoard[x][y].ship !== null) {
         this.gameBoard[x][y].ship.hit();
         this.gameBoard[x][y].isHit = true;
         return true;
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
}
