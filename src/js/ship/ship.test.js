import { Ship } from "./ship.js";


test("hit count increases on call", () => {
    const testShip = new Ship()

    testShip.hit()
    expect(testShip).toHaveProperty("hits", 1)
})