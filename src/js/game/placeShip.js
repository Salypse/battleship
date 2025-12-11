export function placeShips(player) {
   placeShipsDisplay(player);
}

function placeShipsDisplay(player) {
   const body = document.querySelector("body");

   const placeShipsPage = document.createElement("div");
   placeShipsPage.id = "place-ships-page";

   const placeShipsHeader = document.createElement("div");
   placeShipsHeader.id = "place-ships-header";

   const randomPlacementButton = document.createElement("button");
   randomPlacementButton.id = "random-placement";
   randomPlacementButton.textContent = "Random";
   randomPlacementButton.addEventListener("click", () => {
      player.gameBoard.placeShipsRandomly();
   });

   placeShipsHeader.append(randomPlacementButton);
   placeShipsPage.append(placeShipsHeader);
   body.append(placeShipsPage);
}
