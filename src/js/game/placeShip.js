import { updatePlacementGridDisplay } from "./grid/grid-display";

export function placeShips(player, turnText = "Player") {
   return new Promise((resolve) => {
      const body = document.querySelector("body");

      const placeShipsPage = document.createElement("div");
      placeShipsPage.id = "place-ships-page";

      const currentTurnText = document.createElement("p");
      currentTurnText.id = "current-turn";
      currentTurnText.textContent = `${turnText}: Place your ships`;

      const placeShipsHeader = document.createElement("div");
      placeShipsHeader.id = "place-ships-header";

      //Allows user to randomly choose boat locations
      const randomPlacementButton = document.createElement("button");
      randomPlacementButton.id = "random-placement";
      randomPlacementButton.textContent = "Random";
      randomPlacementButton.addEventListener("click", () => {
         player.gameBoard.placeShipsRandomly();
         updatePlacementGridDisplay(player);
      });

      //Submit ship placement choices
      const submitPlacementButton = document.createElement("button");
      submitPlacementButton.id = "submit-placement";
      submitPlacementButton.textContent = "Submit";
      submitPlacementButton.addEventListener("click", () => {
         placeShipsPage.remove();
         //When Player submits return the promise
         resolve();
      });

      //Initial grid placement display
      const placementGrid = document.createElement("div");
      placementGrid.id = "placement-grid";
      for (let i = 0; i < 10; i++) {
         for (let j = 0; j < 10; j++) {
            const node = document.createElement("p");
            node.id = `row-${i + 1} column-${j + 1}`;
            node.classList.add("grid-item");
            placementGrid.append(node);
         }
      }

      placeShipsHeader.append(randomPlacementButton, submitPlacementButton);
      placeShipsPage.append(currentTurnText, placeShipsHeader, placementGrid);
      body.append(placeShipsPage);
   });
}
