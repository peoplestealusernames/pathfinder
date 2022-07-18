export class Grid2d<T> {
    private grid: T[][] = []

    private width: number
    private height: number

    private defaultState: T

    constructor(width: number, height: number, defaultState: T) {
        //TODO: size checking
        this.width = width
        this.height = height

        this.defaultState = defaultState

        this.clear()
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
        this.clear()
    }

    setHeight(height: number): void {
        this.height = height
        this.clear()
    }

    clear(setTo: T = this.defaultState): void {
        this.grid = []

        for (let i = 0; i < this.height; i++) {
            this.grid[i] = []
            for (let k = 0; k < this.width; k++) {
                this.grid[i][k] = setTo
            }
        }
    }

    getGrid(): T[][] {
        return Array.from(this.grid)
    }

    get(x: number, y: number): T | null {
        if (this.grid[y])
            if (this.grid[y][x])
                return this.grid[y][x]

        return null
    }

    reset(state = this.defaultState) {
        this.foreach(
            (x: number, y: number) => {
                this.set(x, y, state)
            }
        )
    }

    set(x: number, y: number, state: T, log = false): boolean {
        //TODO: logging
        if (this.get(x, y) === null) {
            if (log) {
                console.log(`Error:{${x},${y}} is null (out of range?)`)
            }
            return false
        }

        this.grid[y][x] = state
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
        let ret: T[] = []
        for (const rows of this.grid) {
            ret.push(...rows)
        }
        return ret
    }
}