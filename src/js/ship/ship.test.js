import { Ship } from "./ship.js";


test("hit count increases on call", () => {
    const testShip = new Ship()

    testShip.hit()
    expect(testShip).toHaveProperty("hits", 1)
})

test("Is given ship sunk", () => {
    const testShip = new Ship(4)
    testShip.hits = 4

    testShip.isSunk()
    expect(testShip).toHaveProperty("hasSank", true)
})