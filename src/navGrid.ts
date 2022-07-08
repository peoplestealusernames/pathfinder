import { CanvasGrid } from "./canvas";
import { Path, validState, Vec2, Walkable } from "./types";

//TODO: Take as input ToNavGrid
const Movement = [
    new Vec2([0, 1]),
    new Vec2([1, 0]),
    new Vec2([0, -1]),
    new Vec2([-1, 0])
]

export class NavGrid {
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

    GetGridStart() {
        return [new Path([new Vec2(...this.grid.getStart())])]
    }

    Reset() {
        this.grid.foreach((x: number, y: number, tile?: validState) => {
            if (tile === "qued" || tile === "checked" || tile === "solved") {
                this.grid.set(x, y, "empty")
            }
        })
        delete (this.Qued)

        const start = this.grid.getStart()
        this.grid.set(start[0], start[1], "start")
        const goal = this.grid.getGoal()
        this.grid.set(goal[0], goal[1], "goal")
    }

    GeneratePath() {
        this.StopRunPath()

        if (!this.Qued)
            this.Qued = this.GetGridStart()

        while (this.Qued.length !== 0 && !this.solved) {
            this.StepPath()
        }
    }

    RunPath() {
        if (!this.timer) {
            clearInterval(this.timer)
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

    StepPath() {
        let ret: Path[] = []

        if (!this.Qued)
            this.Qued = this.GetGridStart()

        console.log(`Stepping pathfinder ${this.Qued.length} paths qued`)
        for (const pos of this.Qued) {
            const [solved, surroundings] = this.CheckSurround(this.grid, pos)
            if (!solved) {
                ret.push(...surroundings)
            } else {
                this.PathFound(this.grid, surroundings[0])
                console.log("path found")
                return [true, surroundings]
            }
        }

        this.Qued = ret
        console.log(`Step done ${ret.length} paths`)
        return [false, ret]
    }

    CheckSurround(grid: CanvasGrid, path: Path): [boolean, Path[]] {
        let ret: Path[] = []
        const origin = path.last()

        let tile = grid.get(origin.x, origin.y)

        if (tile !== "empty") {
            console.log(origin, tile)
        }

        grid.set(origin.x, origin.y, "checked")

        for (const offset of Movement) {

            const pos = origin.add(offset)
            const tile = grid.get(pos.x, pos.y)
            if (tile)
                if (Walkable[tile]) {
                    if (tile === "goal") {
                        path.add(pos)
                        return [true, [path]]
                    }
                    let Branch = path.Branch()
                    Branch.add(pos)
                    ret.push(Branch)
                    grid.set(pos.x, pos.y, "qued")
                }
        }

        return [false, ret]
    }

    PathFound(grid: CanvasGrid, path: Path) {
        for (const node of path.nodes) {
            grid.set(node.x, node.y, "solved")
        }
    }
}