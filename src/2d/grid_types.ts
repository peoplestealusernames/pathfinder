export class Grid2d<T> {
    private grid: T[] = []

    private width: number
    private height: number

    private defaultState: T

    constructor(width: number, height: number, defaultState: T) {
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
    setWidth(width: number): void {
        this.width = width
        this.reset()
    }

    setHeight(height: number): void {
        this.height = height
        this.reset()
    }

    reset(setTo: T = this.defaultState): void {
        this.grid = []
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                this.grid[this.toI(x, y)] = setTo
    }

    outOfBounds(x: number, y: number) {
        return (x < 0 || y < 0 || x >= this.width || y >= this.height)
    }

    toI(x: number, y: number): number {
        return x + y * (this.width)
    }

    get(x: number, y: number): T | null {
        if (this.outOfBounds(x, y))
            return null
        const id = this.toI(x, y)

        return this.grid[id]

    }

    set(x: number, y: number, state: T, log = false): boolean {
        if (this.get(x, y) === null) {
            if (log) {
                console.log(`Error:{${x},${y}} is null (out of range?)`)
            }
            return false
        }

        this.grid[this.toI(x, y)] = state
        if (log) {
            console.log(`Update:{${x},${y}} is ${state}`)
        }

        return true
    }

    foreach<R>(run: (x: number, y: number, state?: T) => R): R[] {
        let ret: R[] = []

        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++) {
                const tile = this.get(x, y)
                if (tile)
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