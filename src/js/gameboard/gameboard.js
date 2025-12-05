export class Gameboard {
   constructor() {
      const GRIDSIZE = 10;
      this.gameBoard = Array.from({ length: GRIDSIZE }, () =>
         Array.from({ length: GRIDSIZE }, () => ({
            ship: null,
            attacked: false,
         }))
      );

      this.rotateShip = false;
   }

   placeShip(coordinate, ship) {
      //Find cells ship will be placed on
      const cellsToPlace = findCells(coordinate, ship.length);

      //Check if ship when placed will be out of bounds
      //Check if any of the cells already have a ship
      //Place ship in gameboard
   }

   findCells(coordinate, length) {
      let x = coordinate[0];
      let y = coordinate[1];

      let cells = [[x, y]];

      while (cells.length < length) {
         if (this.rotateShip === true) {
            cells.push([x, ++y]);
         } else {
            cells.push([++x, y]);
         }
      }
      return cells;
   }
}
