export class Ship {
   constructor(length = 1) {
      this.length = length;
      this.hits = 0;
      this.hasSank = false;
   }

   hit() {
      if (!this.hasSank) {
         this.hits++;
         //After every hit determine if the ship is sunk
         this.isSunk();
      }
   }

   isSunk() {
      if (this.hits >= this.length) {
         this.hasSank = true;
      }
   }
}
