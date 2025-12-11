export function placeShips(player) {
   return new Promise((resolve) => {
      const body = document.querySelector("body");

      const placeShipsPage = document.createElement("div");
      placeShipsPage.id = "place-ships-page";

      const placeShipsHeader = document.createElement("div");
      placeShipsHeader.id = "place-ships-header";

      //Allows user to randomly choose boat locations
      const randomPlacementButton = document.createElement("button");
      randomPlacementButton.id = "random-placement";
      randomPlacementButton.textContent = "Random";
      randomPlacementButton.addEventListener("click", () => {
         player.gameBoard.placeShipsRandomly();
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

      placeShipsHeader.append(randomPlacementButton, submitPlacementButton);
      placeShipsPage.append(placeShipsHeader);
      body.append(placeShipsPage);
   });
}
