import { CanvasGrid } from "./canvas";
import { getRandomInt, sleep } from "./misc";
import { Path, Walkable } from "./types";

const Movement: [number, number][] = [
    [0, 2],
    [2, 0],
    [0, -2],
    [-2, 0]
]

export function mazeGen(grid: CanvasGrid) {
    grid.reset("wall")

    let Stack: [number, number][] = [grid.getStart()]

    while (true) {
        const origin = Stack[Stack.length - 1]
        if (!origin)
            break

        let options: [[number, number], [number, number]][] = []

        for (const offset of Movement) {
            const pos: [number, number] = [origin[0] + offset[0], origin[1] + offset[1]]
            const tile = grid.get(pos[0], pos[1])

            if (tile === "wall")
                options.push([offset, pos])
        }

        if (options.length > 0) {
            const ind = getRandomInt(options.length)
            const [offset, pos] = options[ind]
            Stack.push(pos)
            //TODO: change to que changes with render layer
            grid.set(pos[0], pos[1], "empty")
            grid.set(origin[0] + offset[0] / 2, origin[1] + offset[1] / 2, "empty")
        } else {
            Stack.pop()
        }
    }

    const upOrLeft = getRandomInt(2)
    grid.set(grid.getWidth() - 1 - upOrLeft, grid.getHeight() - (2 - upOrLeft), "empty")
}