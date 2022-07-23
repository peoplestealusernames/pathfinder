import { Grid2d, GridEvents } from "./grid_types"
import { navState, baseState, keyLike, allStates } from "../backend/types"
import { outOfBounds } from "../backend/misc"
import { TypedEventEmitter } from "../backend/events"

type LayerMangerEvents = GridEvents<allStates> & {
    goalMove: (x: number, y: number) => void
    startMove: (x: number, y: number) => void
}

export class LayerManger extends TypedEventEmitter<LayerMangerEvents> {
    private width = 5
    private height = 5

    readonly NavGrid = new Grid2d<navState>(this.width, this.height, undefined)
    readonly BaseGrid = new Grid2d<baseState>(this.width, this.height, undefined)

    private readonly order = [this.NavGrid, this.BaseGrid]

    private goal: [number, number] = [-2, -2]
    private start: [number, number] = [-2, -2]

    move(x: number, y: number, state: "goal" | "start") {
        const current = this.BaseGrid.get(...this[state])
        if (current === state)
            this.BaseGrid.set(...this[state], undefined, true)

        this.BaseGrid.set(x, y, state, true)
        this[state] = [x, y]
        this.emit(`${state}Move`, x, y)
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
        super()
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
        this.emit("sizeChange", this.width, this.height)
    }
    //TODO:foreach layer

    clear() {
        this.BaseGrid.clear()
        this.NavGrid.clear()
        this.placeSF()
        this.emit("clear")
    }

    placeSF() {
        this.move(0, 0, "start")
        this.move(this.width - 1, this.height - 1, "goal")
    }

    getTop(x: number, y: number): keyLike | false {
        if (outOfBounds(x, y, this.width, this.height))
            return false

        for (const layer of this.order) {
            const tile = layer.get(x, y)
            if (tile)
                return tile
        }

        return "empty"
    }
}