import { outOfBounds, removeItem } from "../backend/misc"

type FNC<T> = (x: number, y: number, state: T) => void

export class Grid2d<T> {
    private grid: T[] = []

    private defaultState: T

    private updateCallbacks: FNC<T>[] = []

    private width: number
    private height: number

    constructor(width: number, height: number, defaultState: T) {
        //TODO: size checking
        this.width = width
        this.height = height

        this.defaultState = defaultState

        this.reset()
    }

    addCallback(callback: FNC<T>) {
        this.updateCallbacks.push(callback)
    }
    removeCallback(callback: FNC<T>) {
        removeItem(this.updateCallbacks, callback)
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

    private reset(defaultState: T = this.defaultState): void {
        this.defaultState = defaultState
        this.grid = []
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                this.grid[this.toI(x, y)] = this.defaultState
    }

    clear(setTo: T = this.defaultState): void {
        this.foreach((x, y, state) => {
            if (state !== setTo)
                this.set(x, y, setTo)
        })
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

        for (const callback of this.updateCallbacks) {
            callback(x, y, state)
        }
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