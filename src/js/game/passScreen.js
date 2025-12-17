export function passScreen() {
   return new Promise((resolve) => {
      const body = document.querySelector("body");
      body.innerHTML = "";

      const passText = document.createElement("p");
      passText.id = "pass-text";
      passText.textContent = "Please pass the device to other player";

      const doneButton = document.createElement("button");
      doneButton.id = "done-button";
      doneButton.textContent = "Done";
      doneButton.addEventListener("click", () => {
         resolve();
      });

      body.append(passText, doneButton);
   });
}
