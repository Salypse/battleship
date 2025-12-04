export class Ship {
    constructor(length) {
        this.length = length
        this.hits = 0
        this.hasSank = false
    }

    hit() {
        this.hits++
    }

    isSunk() {
        if (this.hits >= this.length) {
            this.hasSank = true;
        }
    }
}