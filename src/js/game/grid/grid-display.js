export function updatePlacementGridDisplay(player) {
   for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
         const node = findNode([i, j]);
         if (player.gameBoard.grid[i][j].ship) {
            node.textContent = "X";
            node.classList.add("ship-grid-item");
         } else {
            node.textContent = "";
         }
      }
   }
}

export function updateEnemyGuessGridDisplay(player) {
   for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
         const node = findEnemyNode([i, j]);
         if (
            player.gameBoard.grid[i][j].isHit &&
            player.gameBoard.grid[i][j].ship
         ) {
            node.classList.add("ship-grid-item");
            node.textContent = "X";
         } else if (
            player.gameBoard.grid[i][j].isHit &&
            !player.gameBoard.grid[i][j].ship
         ) {
            node.textContent = "O";
         }
      }
   }
}

export function findNode(coordinate) {
   const x = coordinate[0] + 1;
   const y = coordinate[1] + 1;

   //Find node where row = x and column = y
   return document.getElementById(`row-${x} column-${y}`);
}

function findEnemyNode(coordinate) {
   const x = coordinate[0] + 1;
   const y = coordinate[1] + 1;

   //Find node where row = x and column = y
   return document.getElementById(`enemy: row-${x} column-${y}`);
}
