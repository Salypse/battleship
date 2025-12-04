import { Ship } from "./ship.js";


test("hit count increases on call", () => {
    const ship = new Ship(0)

    ship.hit()
    expect(ship).toHaveProperty("hits", 1)
})

test("Doesnt add to hit total if ship is sunk", () => {
    const ship = new Ship(3)

    ship.hits = 3 //Sink Ship
    ship.isSunk() //Update hasSank value
    ship.hit()

    expect(ship).toHaveProperty("hits", 3)
})

test("Is given ship sunk", () => {
    const ship = new Ship(4)
    ship.hits = 4

    ship.isSunk()
    expect(ship).toHaveProperty("hasSank", true)
})