import { Grid2d } from "./grid_types"
import { navState, baseState, allStates, keyLike } from "../backend/types"
import { trueEqual } from "../backend/misc"

export class LayerManger {
    private width = 5
    private height = 5

    readonly NavGrid = new Grid2d<navState>(this.width, this.height, undefined)
    readonly BaseGrid = new Grid2d<baseState>(this.width, this.height, undefined)

    private readonly order = [this.NavGrid, this.BaseGrid]

    private goal: [number, number] = [-2, -2]
    private start: [number, number] = [-2, -2]

    moveStart(x: number, y: number) {
        if (this.BaseGrid.get(...this.start) === "start")
            this.BaseGrid.set(...this.start, undefined, true)
        this.BaseGrid.set(x, y, "start", true)
        this.start = [x, y]
    }

    moveGoal(x: number, y: number) {
        if (this.BaseGrid.get(...this.goal) === "goal")
            this.BaseGrid.set(...this.goal, undefined)
        this.BaseGrid.set(x, y, "goal")
        this.goal = [x, y]
    }

    getStart() {
        return this.start
    }
    getGoal() {
        return this.goal
    }

    setWidth(x: number) {
        this.width = x
        this.sizeChange()
    }
    setHeight(y: number) {
        this.height = y
        this.sizeChange()
    }

    getWidth() {
        return this.width
    }
    getHeight() {
        return this.height
    }

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.sizeChange()
        this.placeSF()
    }

    setSize(width: number, height: number) {
        this.width = width
        this.height = height
        this.sizeChange()
    }

    sizeChange() {
        //TODO:impliment scale
        this.NavGrid.setSize(this.width, this.height)
        this.BaseGrid.setSize(this.width, this.height)
        this.placeSF()
    }
    //TODO:foreach layer

    reset() {
        this.BaseGrid.clear()
        this.NavGrid.clear()
        this.placeSF()
    }

    placeSF() {
        this.moveStart(0, 0)
        this.moveGoal(this.width - 1, this.height - 1)
    }

    getTop(x: number, y: number): keyLike | false {
        const pos = [x, y]
        if (trueEqual(this.start, pos))
            return "start"
        if (trueEqual(this.goal, pos))
            return "goal"

        for (const layer of this.order) {
            const tile = layer.get(x, y)
            if (tile)
                return tile
        }

        return "empty"
    }
}