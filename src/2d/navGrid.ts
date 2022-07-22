import { LayerManger } from "./LayerManger";
import { navState, Path } from "../backend/types";
import { isWalkable } from "../backend/misc";
import { StepFloodFill } from "../pathfinders/floodfill";

//TODO: Take as input ToNavGrid
const Movement: [number, number][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
]

//TODO: fix bug where grid update doesnt cause nav reset
export class NavGrid {
    //TODO: nav agent for diffrent types of path finding
    readonly grid: LayerManger

    private solved = false //TODO: make only modifyable from class but readable out
    private Qued?: Path[]
    private timer?: NodeJS.Timer;

    constructor(grid: LayerManger) {
        this.grid = grid
    }

    GetQued() {
        if (this.Qued)
            return Array.from(this.Qued)
        else return this.Qued
    }

    GetQueStart() {
        const start = this.grid.getStart()
        let ret: Path[] = []

        for (const offset of Movement) {
            const pos: [number, number] = [start[0] + offset[0], start[1] + offset[1]]
            const tile = this.grid.getTop(pos[0], pos[1])

            if (isWalkable(tile))
                ret.push(new Path([start, pos]))
        }

        return ret
    }

    Reset() {
        this.grid.NavGrid.clear()
        delete (this.Qued)

        this.StopRunPath()
        this.solved = false
    }

    GeneratePath() {
        this.StopRunPath()

        if (!this.Qued)
            this.Qued = this.GetQueStart()

        while (this.Qued.length !== 0 && !this.solved) {
            [this.solved] = this.StepPath(false)
        }
    }

    TogglePath() {
        if (this.timer)
            this.StopRunPath()
        else
            this.RunPath()
    }

    RunPath() {
        if (!this.timer) {
            this.timer = setInterval(() => {
                const [solved, qued] = this.StepPath()

                if (solved || qued.length === 0) {
                    this.StopRunPath()
                }
            }, 100)
        }
    }

    StopRunPath() {
        clearInterval(this.timer)
        this.timer = undefined
    }

    StepPath(log = true): [boolean, Path[]] {
        let out = (stri: string) => { }
        if (log)
            out = (stri: string) => { console.log(stri) }

        if (this.solved) {
            out("already solved")
            return [true, []]
        }

        if (!this.Qued)
            this.Qued = this.GetQueStart()

        out(`Stepping pathfinder ${this.Qued.length} paths qued`)

        //TODO: grab from class
        const [solved, qued] = StepFloodFill(this.Qued, this.grid)

        this.solved = solved
        this.Qued = qued
        out(`Step done ${qued.length} paths`)
        if (this.solved) {
            out("Path found")
            this.PathFound(qued[0])
        }

        return [solved, qued]
    }

    PathFound(path: Path) {
        for (const node of path.nodes) {
            this.grid.NavGrid.set(node[0], node[1], "solved")
        }
    }
}