import { LayerManger } from "./LayerManger";
import { navState, Path, Walkable } from "../backend/types";

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

            if (tile)
                if (Walkable[tile])
                    ret.push(new Path([start, pos]))
        }

        return ret
    }

    Reset() {
        this.grid.NavGrid.foreach((x: number, y: number, tile?: navState) => {
            if (tile === "qued" || tile === "checked" || tile === "solved") {
                this.grid.NavGrid.set(x, y, undefined)
            }
        })
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
        let ret: Path[] = []

        let out = (stri: string) => { }

        if (this.solved) {
            out("already solved")
            return [true, []]
        }

        if (log)
            out = (stri: string) => { console.log(stri) }

        if (!this.Qued)
            this.Qued = this.GetQueStart()

        out(`Stepping pathfinder ${this.Qued.length} paths qued`)

        for (const pos of this.Qued) {
            const [solved, surroundings] = this.CheckSurround(pos)
            if (!solved) {
                ret.push(...surroundings)
            } else {
                this.solved = true
                this.PathFound(surroundings[0])
                out("solution found")

                return [true, surroundings]
            }
        }

        this.Qued = ret
        out(`Step done ${ret.length} paths`)

        return [false, ret]
    }

    CheckSurround(path: Path): [boolean, Path[]] {
        let ret: Path[] = []
        const origin = path.last()

        this.grid.NavGrid.set(origin[0], origin[1], "checked")

        for (const offset of Movement) {
            const pos: [number, number] = [origin[0] + offset[0], origin[1] + offset[1]]
            const tile = this.grid.getTop(pos[0], pos[1])

            if (tile)
                if (Walkable[tile]) {
                    if (tile === "goal") {
                        path.add(pos)
                        return [true, [path]]
                    }
                    let Branch = path.Branch()
                    Branch.add(pos)
                    ret.push(Branch)
                    this.grid.NavGrid.set(pos[0], pos[1], "qued")
                }
        }

        return [false, ret]
    }

    PathFound(path: Path) {
        for (const node of path.nodes) {
            this.grid.NavGrid.set(node[0], node[1], "solved")
        }
    }
}