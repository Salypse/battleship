import { Gameboard } from "./gameboard.js";

test("Create a 10x10 grid", () => {
   const board = new Gameboard();

   expect(board.gameBoard.length).toBe(10);
   board.gameBoard.forEach((row) => expect(row.length).toBe(10));
});

test("Every grid cell has correct default values", () => {
   const board = new Gameboard();

   board.gameBoard.forEach((row) =>
      row.forEach(
         (cell) => (
            expect(cell).toHaveProperty("ship", null),
            expect(cell).toHaveProperty("attacked", false)
         )
      )
   );
});

test("Find correct cells for given coordinate", () => {
   const board = new Gameboard();

   //No rotate
   expect(board.findCells([5, 5], 3)).toEqual([
      [5, 5],
      [6, 5],
      [7, 5],
   ]);

   //Rotate
   board.rotateShip = true;

   expect(board.findCells([3, 6], 4)).toEqual([
      [3, 6],
      [3, 5],
      [3, 4],
      [3, 3],
   ]);
});

test("Correctly determines if cells are invalid", () => {
   const board = new Gameboard();

   //Out of bounds nodes
   expect(
      board.isValidCells([
         [9, 9],
         [9, 10],
         [9, 11],
      ])
   ).toBe(false);

   //Given cell already has a ship
   board.gameBoard[0][0].ship = true;
   expect(
      board.isValidCells([
         [0, 0],
         [1, 0],
         [2, 0],
      ])
   ).toBe(false);
});

test("Place ship onto gameboard", () => {
   const board = new Gameboard();

   class Ship {
      constructor(length) {
         this.length = length;
      }
   }

   //Vertical placement
   const testShip1 = new Ship(4);

   board.placeShip([0, 0], testShip1);
   expect(board.gameBoard[0][0]).toHaveProperty("ship", testShip1);
   expect(board.gameBoard[1][0]).toHaveProperty("ship", testShip1);
   expect(board.gameBoard[2][0]).toHaveProperty("ship", testShip1);
   expect(board.gameBoard[3][0]).toHaveProperty("ship", testShip1);

   //Horizontal placement
   const testShip2 = new Ship(3);
   board.rotateShip = true;

   board.placeShip([4, 5], testShip2);
   expect(board.gameBoard[4][5]).toHaveProperty("ship", testShip2);
   expect(board.gameBoard[4][4]).toHaveProperty("ship", testShip2);
   expect(board.gameBoard[4][3]).toHaveProperty("ship", testShip2);
});
