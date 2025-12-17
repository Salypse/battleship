import { EntryPlugin } from "webpack";
import { Gameboard } from "./gameboard.js";
import { Ship } from "../ship/ship.js";

test("Create a 10x10 grid", () => {
   const board = new Gameboard();

   expect(board.grid.length).toBe(10);
   board.grid.forEach((row) => expect(row.length).toBe(10));
});

test("Every grid cell has correct default values", () => {
   const board = new Gameboard();

   board.grid.forEach((row) =>
      row.forEach(
         (cell) => (
            expect(cell).toHaveProperty("ship", null),
            expect(cell).toHaveProperty("isHit", undefined)
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
   board.grid[0][0].ship = true;
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

   //Vertical placement
   const testShip1 = new Ship(4);

   board.placeShip([0, 0], testShip1);
   expect(board.grid[0][0]).toHaveProperty("ship", testShip1);
   expect(board.grid[1][0]).toHaveProperty("ship", testShip1);
   expect(board.grid[2][0]).toHaveProperty("ship", testShip1);
   expect(board.grid[3][0]).toHaveProperty("ship", testShip1);

   //Horizontal placement
   const testShip2 = new Ship(3);
   board.rotateShip = true;

   board.placeShip([4, 5], testShip2);
   expect(board.grid[4][5]).toHaveProperty("ship", testShip2);
   expect(board.grid[4][4]).toHaveProperty("ship", testShip2);
   expect(board.grid[4][3]).toHaveProperty("ship", testShip2);
});

test("receiveAttack updates a ship total hit value if hit", () => {
   const board = new Gameboard();
   const testShip1 = new Ship(1);
   const testShip2 = new Ship(3);

   board.placeShip([0, 0], testShip1);
   board.receieveAttack([0, 0]);
   expect(testShip1.hits).toBe(1);
   expect(board.grid[0][0].isHit).toBe(true);

   //Coordinate already guessed
   expect(board.receieveAttack([0, 0])).toBeUndefined();

   //No ship on coordinate
   expect(board.receieveAttack([9, 9])).toBe(false);
   expect(board.grid[9][9].isHit).toEqual(true) &&
      expect(board.grid[9][9].ship).toEqual(null);
});

test("If all ships are sunk call gameOver", () => {
   const board = new Gameboard();

   //Gameboard of only two ships
   const testShip1 = new Ship(2);
   const testShip2 = new Ship(3);

   board.placeShip([0, 0], testShip1);
   testShip1.hits = 2;
   testShip1.hasSank = true;

   board.placeShip([4, 4], testShip2);
   expect(board.receieveAttack([4, 4])).toEqual(true);
   expect(board.receieveAttack([5, 4])).toEqual(true);
   expect(board.receieveAttack([6, 4])).toEqual("game over");
});
