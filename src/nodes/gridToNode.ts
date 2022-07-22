import { Grid2d } from "../2d/grid_types";
import { isWalkable } from "../backend/misc";
import { baseState } from "../backend/types";
import { Node } from "./NodeClass";

//TODO: room and maze simplifiers
type xy = { x: number, y: number }

export function GridToNode2d<T extends baseState>(grid: Grid2d<T>, movement: [number, number][]) {
    const Ret = new Grid2d<undefined | Node<xy>>
        (grid.getWidth(), grid.getHeight(), undefined)

    grid.foreach(
        (x, y, state) => {
            if (!isWalkable(state))
                return

            const aNode = new Node<xy>(1, { x, y })
            Ret.set(x, y, aNode)
        }
    )

    Ret.foreach(
        (x, y, state) => {
            if (!state)
                return

            for (const offset of movement) {
                const pos: [number, number] = [x + offset[0], y + offset[1]]
                const tile = Ret.get(pos[0], pos[1])

                if (tile) {
                    state.addChilds(tile)
                }
            }
        }
    )

    grid.addCallback((x, y, state) => {
        let RefNode = Ret.get(x, y)
        if (RefNode === false)
            return

        if (isWalkable(state)) {
            if (!RefNode) {
                RefNode = new Node<xy>(1, { x, y })
                for (const offset of movement) {
                    const pos: [number, number] = [x + offset[0], y + offset[1]]
                    const tile = Ret.get(pos[0], pos[1])

                    if (tile) {
                        RefNode.addChilds(tile)
                        RefNode.addParents(tile)
                    }
                }
            }
        } else {
            if (RefNode) {
                RefNode.deleteSelf()
                RefNode = undefined
            }
        }
        Ret.set(x, y, RefNode)
    })

    return Ret
}