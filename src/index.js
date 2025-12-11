import "./styles.css";
import { startGame } from "./js/game/startGame.js";

const body = document.querySelector("body");
const pvpButton = document.getElementById("pvp");
const pveButton = document.getElementById("pve");

pvpButton.addEventListener("click", () => {
   body.innerHTML = "";
   startGame("pvp");
});

pveButton.addEventListener("click", () => {
   body.innerHTML = "";
   startGame("pve");
});
