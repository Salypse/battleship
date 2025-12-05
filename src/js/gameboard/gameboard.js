export class Gameboard {
   constructor() {
      const GRIDSIZE = 10;
      this.gameBoard = Array.from({ length: GRIDSIZE }, () =>
         Array.from({ length: GRIDSIZE }, () => ({
            ship: null,
            attacked: false,
         }))
      );
   }
}
