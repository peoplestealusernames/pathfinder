import { TypedEventEmitter } from "../backend/events"
import { outOfBounds } from "../backend/misc"

export type GridEvents<T> = {
    update: (x: number, y: number, state: T) => void
    sizeChange: (width: number, height: number) => void
    clear: () => void
}

export class Grid2d<T> extends TypedEventEmitter<GridEvents<T>> {
    private grid: T[] = []

    private defaultState: T

    private width: number
    private height: number

    constructor(width: number, height: number, defaultState: T) {
        super()
        //TODO: size checking
        this.width = width
        this.height = height

        this.defaultState = defaultState

        this.reset()
    }

    getWidth(): number {
        return this.width
    }

    getHeight(): number {
        return this.height
    }

    //TODO: checker on seter to make sure it's valid
    setWidth(width: number) {
        this.width = width
        this.reset()
    }

    setHeight(height: number) {
        this.height = height
        this.reset()
    }

    setSize(width: number, height: number) {
        this.height = height
        this.width = width
        this.reset()
    }

    private reset(): void {
        this.grid = []
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                this.grid[this.toI(x, y)] = this.defaultState

        this.emit("sizeChange", this.width, this.height)
    }

    clear(setTo: T = this.defaultState, makeDefault = false): void {
        this.foreach((x, y, state) => {
            if (state !== setTo)
                this.set(x, y, setTo)
        })
        if (makeDefault)
            this.defaultState = setTo

        this.emit("clear")
    }

    getDefault() {
        return this.defaultState
    }

    toI(x: number, y: number): number {
        return x + y * (this.width)
    }

    get(x: number, y: number): T | false {
        if (outOfBounds(x, y, this.getWidth(), this.getHeight()))
            return false
        const id = this.toI(x, y)

        return this.grid[id]
    }

    set(x: number, y: number, state: T, log = false): boolean {
        if (this.get(x, y) === false) {
            if (log) {
                console.log(`Error:{${x},${y}} is out of range`)
            }
            return false
        }

        this.grid[this.toI(x, y)] = state
        if (log) {
            console.log(`Update:{${x},${y}} is ${state}`)
        }

        this.emit("update", x, y, state)
        return true
    }

    foreach<R>(run: (x: number, y: number, state?: T) => R): R[] {
        let ret: R[] = []

        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++) {
                const tile = this.get(x, y)
                if (tile !== false)
                    try {
                        ret.push(run(x, y, tile))
                    } catch (e) {
                        console.error(`Error at grid foreach ${x},${y}`, e)
                    }
            }

        return ret
    }

    unpack(): T[] {
        return this.grid
    }
}