import { validState, SwapTable, allowOne } from "./types"

export function UpdateCanvas(grid: validState[][]) {
    const elem = document.getElementById('GridCanvas') as any
    if (!elem)
        throw new Error("Cannot find canvas")

    //TODO: scale to size
    //TODO:math to make them aways square and always right size
    const width = grid[0].length * 10
    const height = grid.length * 10

    elem.width = width
    elem.height = height

    const context = elem.getContext('2d') as CanvasRenderingContext2D
}

export function UpdateSquare(grid: validState[][], x: number, y: number) {
    const elem = document.getElementById('GridCanvas') as any
    if (!elem)
        throw new Error("Cannot find canvas")

    const context = elem.getContext('2d') as CanvasRenderingContext2D
    context.fillStyle = SwapTable[grid[x][y]]
    context.fillRect(x * 10 + 1, y * 10 + 1, 8, 8)
}

export class CanvasGrid {
    //TODO: Canvas manager
    //TODO: scaling math
    //TODO: Move solution and solution finder to second layer canvas or grid
    //TODO: Move que into solution/pathfinding layer

    private grid: validState[][] = []

    private start: [number, number] = [-1, -1] //Set in construct
    private goal: [number, number] = [-1, -1] //Set in construct

    readonly width: number
    readonly height: number

    private context?: CanvasRenderingContext2D
    private canvas?: HTMLCanvasElement

    constructor(width: number, height: number) {
        this.width = width
        this.height = height

        this.reset()
    }

    addCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas

        this.canvas.width = this.width * 10
        this.canvas.height = this.height * 10

        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
        const img = new Image(this.width * 10, this.height * 10)
        this.context.drawImage(img, 0, 0, img.width * 10, img.height * 10)
        this.context.fillStyle = "black"
        this.context.fillRect(0, 0, img.width * 10, img.height * 10)

        this.reRender()
    }

    reset() {
        this.grid = []

        for (let i = 0; i < this.height; i++) {
            this.grid[i] = []
            for (let k = 0; k < this.width; k++) {
                this.grid[i][k] = "empty"
            }
        }

        this.set(0, 0, "start")
        this.set(this.width - 1, this.height - 1, "goal")

        this.reRender()
    }

    getStart() {
        return this.start
    }

    getGoal() {
        return this.goal
    }

    getGrid() {
        return Array.from(this.grid)
    }

    reRender() {
        if (!this.context)
            return false

        for (const ys in this.grid) {
            const y = parseInt(ys)
            for (const xs in this.grid[y]) {
                const x = parseInt(xs)
                const tile = this.grid[y][x]

                this.set(x, y, tile)
            }
        }
    }

    get(x: number, y: number) {
        if (this.grid[y]) {
            const tile = this.grid[y][x]
            if (tile)
                return tile
        }
        return null
    }

    set(x: number, y: number, state: validState) {
        if (this.get(x, y) === null)
            return false

        this.grid[y][x] = state

        if (!this.context)
            return false
        this.context.fillStyle = SwapTable[state]
        this.context.fillRect(x * 10 + 1, y * 10 + 1, 8, 8)

        if (allowOne.includes(state)) {
            //@ts-ignore
            const prev = this[state]
            if (prev[0] != x && prev[1] != y)
                this.set(prev[0], prev[1], "empty")

            //@ts-ignore
            this[state] = [x, y]
        }

        this.grid[y][x] = state
        return true
    }

    foreach<T>(run: (x: number, y: number, tile?: validState) => T): T[] {
        let ret: T[] = []

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
}