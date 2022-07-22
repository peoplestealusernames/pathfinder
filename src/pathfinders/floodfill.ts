import { LayerManger } from "../2d/LayerManger"
import { isWalkable } from "../backend/misc"
import { Path } from "../backend/types"

const Movement: [number, number][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
]

export function StepFloodFill(qued: Path[], grid: LayerManger): [boolean, Path[]] {
    let ret: Path[] = []

    for (const pos of qued) {
        const [solved, surroundings] = CheckSurround(pos, grid)
        if (!solved) {
            ret.push(...surroundings)
        } else {
            return [true, surroundings]
        }
    }

    return [false, ret]
}

function CheckSurround(path: Path, grid: LayerManger): [boolean, Path[]] {
    let ret: Path[] = []
    const origin = path.last()

    grid.NavGrid.set(origin[0], origin[1], "checked")

    for (const offset of Movement) {
        const pos: [number, number] = [origin[0] + offset[0], origin[1] + offset[1]]
        const tile = grid.getTop(pos[0], pos[1])

        if (isWalkable(tile)) {
            if (tile === "goal") {
                path.add(pos)
                return [true, [path]]
            }
            let Branch = path.Branch()
            Branch.add(pos)
            ret.push(Branch)
            grid.NavGrid.set(pos[0], pos[1], "qued")
        }
    }

    return [false, ret]
}