import { CanvasGrid } from "../canvas";
import { Path, validState, Walkable } from "../backend/types";

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
    readonly grid: CanvasGrid

    private solved = false //TODO: make only modifyable from class but readable out
    private Qued?: Path[]
    private timer?: NodeJS.Timer;

    constructor(grid: CanvasGrid) {
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
            const tile = this.grid.get(pos[0], pos[1])

            if (tile)
                if (Walkable[tile])
                    ret.push(new Path([start, pos]))
        }

        return ret
    }

    Reset() {
        this.grid.foreach((x: number, y: number, tile?: validState) => {
            if (tile === "qued" || tile === "checked" || tile === "solved") {
                this.grid.set(x, y, "empty")
            }
        })
        delete (this.Qued)

        this.StopRunPath()
        this.solved = false
        const start = this.grid.getStart()
        this.grid.set(start[0], start[1], "start")
        const goal = this.grid.getGoal()
        this.grid.set(goal[0], goal[1], "goal")
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
                this.StepPath()

                if (this.solved) {
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
            const [solved, surroundings] = this.CheckSurround(this.grid, pos)
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

    CheckSurround(grid: CanvasGrid, path: Path): [boolean, Path[]] {
        let ret: Path[] = []
        const origin = path.last()

        grid.set(origin[0], origin[1], "checked")

        for (const offset of Movement) {
            const pos: [number, number] = [origin[0] + offset[0], origin[1] + offset[1]]
            const tile = grid.get(pos[0], pos[1])

            if (tile)
                if (Walkable[tile]) {
                    if (tile === "goal") {
                        path.add(pos)
                        return [true, [path]]
                    }
                    let Branch = path.Branch()
                    Branch.add(pos)
                    ret.push(Branch)
                    grid.set(pos[0], pos[1], "qued")
                }
        }

        return [false, ret]
    }

    PathFound(path: Path) {
        for (const node of path.nodes) {
            this.grid.set(node[0], node[1], "solved")
        }
    }
}