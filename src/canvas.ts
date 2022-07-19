import { Grid2d } from "./2d/grid_types"
import { validState, SwapTable } from "./backend/types"

export class CanvasGrid extends Grid2d<validState>{
    private start: [number, number] = [-2, -2] //Set in construct
    private goal: [number, number] = [-2, -2] //Set in construct

    private context?: CanvasRenderingContext2D
    private canvas?: HTMLCanvasElement

    constructor(width: number, height: number) {
        super(width, height, "empty")

        this.reset()
    }

    addCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D

        this.reRender()
    }

    getStart(): [number, number] {
        return this.start
    }

    getGoal(): [number, number] {
        return this.goal
    }

    reRender() {
        if (!this.context || !this.canvas)
            return false

        const width = this.getWidth()
        const height = this.getHeight()

        this.canvas.width = width * 10
        this.canvas.height = height * 10

        const img = new Image(width * 10, height * 10)
        this.context.drawImage(img, 0, 0, img.width * 10, img.height * 10)
        this.context.fillStyle = "black"
        this.context.fillRect(0, 0, img.width * 10, img.height * 10)

        this.foreach((x, y, state) => { if (state) this.render(x, y, state) })
    }

    render(x: number, y: number, tile: validState) {
        if (!this.context || !this.canvas)
            return false

        this.context.fillStyle = SwapTable[tile]
        this.context.fillRect(x * 10 + 1, y * 10 + 1, 8, 8)
        return true
    }

    set(x: number, y: number, state: validState, log = false): boolean {
        if (state == "goal") {
            const goal = this.getGoal()
            if (goal)
                this.set(...goal, "empty")
            this.goal = [x, y]
        }
        if (state == "start") {
            const start = this.getGoal()
            if (start)
                this.set(...start, "empty")
            this.start = [x, y]
        }

        if (super.set(x, y, state, log)) {
            return this.render(x, y, state)
        } else
            return false
    }

    reset(state?: validState) {
        super.reset(state)
        this.placeSF()
        this.reRender()
    }

    placeSF() {
        this.set(0, 0, "start")
        this.set(this.getWidth() - 1, this.getHeight() - 1, "goal")
    }

    setWidth(width: number): void {
        super.setWidth(width)
        this.placeSF()
        this.reRender()
    }

    setHeight(height: number): void {
        super.setHeight(height)
        this.placeSF()
        this.reRender()
    }
}