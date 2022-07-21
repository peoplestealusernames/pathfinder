import { Grid2d } from "../2d/grid_types";
import { isWalkable } from "../backend/misc";
import { baseState } from "../backend/types";
import { Node } from "./NodeClasses";

//TODO: room and maze simplifiers
type xy = { x: number, y: number }

export function GridToNode2d<T extends baseState>(grid: Grid2d<T>, movement: [number, number][]) {
    const Ret = new Grid2d<undefined | Node<xy>>
        (grid.getWidth(), grid.getHeight(), undefined)

    grid.foreach(
        (x, y, state) => {
            console.log(state, isWalkable(state));

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

    console.log(Ret.get(5, 5))
    console.log(Ret);


    return Ret
}