import { getRandomInt } from "../backend/misc";
import { LayerManger } from "./LayerManger";

const MazeMovement: [number, number][] = [
    [0, 2],
    [2, 0],
    [0, -2],
    [-2, 0]
]

export function mazeGen(grid: LayerManger) {
    //TODO: fix bug where sometimes goal is deleted

    //TODO: incorperate in LayerManager
    grid.NavGrid.clear()
    grid.BaseGrid.clear("wall")
    grid.placeSF()

    let Stack: [number, number][] = [grid.getStart()]

    while (true) {
        const origin = Stack[Stack.length - 1]
        if (!origin)
            break

        let options: [[number, number], [number, number]][] = []

        for (const offset of MazeMovement) {
            const pos: [number, number] = [origin[0] + offset[0], origin[1] + offset[1]]
            const tile = grid.BaseGrid.get(pos[0], pos[1])

            if (tile === "wall")
                options.push([offset, pos])
        }

        if (options.length > 0) {
            const ind = getRandomInt(options.length)
            const [offset, pos] = options[ind]
            Stack.push(pos)
            //TODO: change to que changes with render layer
            grid.BaseGrid.set(pos[0], pos[1], undefined)
            grid.BaseGrid.set(origin[0] + offset[0] / 2, origin[1] + offset[1] / 2, undefined)
        } else {
            Stack.pop()
        }
    }

    const upOrLeft = getRandomInt(2)
    grid.BaseGrid.set(grid.getWidth() - 1 - upOrLeft, grid.getHeight() - (2 - upOrLeft), undefined)
}