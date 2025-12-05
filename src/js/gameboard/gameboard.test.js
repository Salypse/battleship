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
