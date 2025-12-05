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

   expect(board.findCells([3, 2], 4)).toEqual([
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
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
