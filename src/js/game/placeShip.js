import { updatePlacementGridDisplay } from "./grid/grid-display";
import rotateSvg from "../../images/rotate.svg";
import { Ship } from "../ship/ship.js";

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
         errorText.style.display = "none";
         player.gameBoard.placeShipsRandomly();
         updatePlacementGridDisplay(player);
      });

      //Submit ship placement choices
      const submitPlacementButton = document.createElement("button");
      submitPlacementButton.id = "submit-placement";
      submitPlacementButton.textContent = "Submit";
      submitPlacementButton.addEventListener("click", () => {
         //Check if user has placed ships
         if (player.gameBoard.placedShips.length >= 5) {
            placeShipsPage.remove();
            //When Player submits return the promise
            resolve();
         } else {
            errorText.style.display = "block";
            errorText.textContent = "Place ships before submitting";
         }
      });

      const errorText = document.createElement("p");
      errorText.id = "error-text";

      //Drag and drop ship options
      const shipOptions = document.createElement("div");
      shipOptions.id = "ship-options";

      const optionsHeader = document.createElement("div");
      optionsHeader.id = "options-header";

      const headerText = document.createElement("p");
      headerText.id = "header-text";
      headerText.textContent = "Ships";

      const rotateImage = document.createElement("img");
      rotateImage.src = rotateSvg;

      const rotateButton = document.createElement("button");
      rotateButton.id = "rotate";
      rotateButton.addEventListener("click", () => {
         player.gameBoard.rotateShip = !player.gameBoard.rotateShip;

         const shipOptions = document.querySelectorAll(".drag-ship");
         for (const ship of shipOptions) {
            if (player.gameBoard.rotateShip === true) {
               ship.style.flexDirection = "column";
            } else {
               ship.style.flexDirection = "row";
            }
         }
      });
      rotateButton.append(rotateImage);

      //Draggable Ships
      const dragShips = document.createElement("div");
      dragShips.id = "drag-ships";

      const lengths = [2, 3, 3, 4, 5];
      for (length of lengths) {
         const ship = document.createElement("div");
         ship.id = `ship-length-${length}`;
         ship.classList.add("drag-ship");

         ship.draggable = true;
         ship.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("ship-id", event.target.id);
            event.dataTransfer.setData("ship-item", event.target);
         });

         for (let i = 0; i < length; i++) {
            const shipSquare = document.createElement("div");
            shipSquare.classList.add("ship-square");
            ship.append(shipSquare);
         }
         dragShips.append(ship);
      }

      optionsHeader.append(headerText, rotateButton);
      shipOptions.append(optionsHeader, dragShips);

      //Initial grid placement display
      const placementGrid = document.createElement("div");
      placementGrid.id = "placement-grid";
      placementGrid.classList.add("grid");
      for (let i = 0; i < 10; i++) {
         for (let j = 0; j < 10; j++) {
            const node = document.createElement("p");
            node.id = `row-${i + 1} column-${j + 1}`;
            node.classList.add("grid-item");

            //Allow ships to be dragged on to a node an placed
            node.addEventListener("dragover", (event) => {
               event.preventDefault();
            });
            node.addEventListener("drop", (event) => {
               event.preventDefault();

               const shipId = event.dataTransfer.getData("ship-id");
               const shipLength = shipId.at(-1);
               const shipItem = document.getElementById(shipId);

               const newShip = new Ship(shipLength);

               //Allow ship placement if node is a valid location
               if (player.gameBoard.tryShipPlacement([i, j], newShip)) {
                  shipItem.remove();
               }
               updatePlacementGridDisplay(player);
            });
            placementGrid.append(node);
         }
      }

      placeShipsHeader.append(randomPlacementButton, submitPlacementButton);
      placeShipsPage.append(
         currentTurnText,
         placeShipsHeader,
         errorText,
         shipOptions,
         placementGrid
      );
      body.append(placeShipsPage);
   });
}
