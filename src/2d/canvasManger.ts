import { allStates, SwapTable } from "../backend/types"
import { LayerManger } from "./LayerManger"


export class CanvasManager {
    private context?: CanvasRenderingContext2D
    private canvas?: HTMLCanvasElement

    private readonly grid: LayerManger

    constructor(grid: LayerManger) {
        this.grid = grid

        const Update = (x: number, y: number, state: allStates | false) => {
            if (state === undefined)
                state = "empty"
            else if (state === false)
                return

            this.render(x, y, state)
        }

        this.grid.BaseGrid.addCallback(Update)
        this.grid.NavGrid.addCallback(Update)
    }

    addCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D

        this.reRender()
    }

    reRender() {
        if (!this.context || !this.canvas)
            return false

        const width = this.grid.getWidth()
        const height = this.grid.getHeight()

        this.canvas.width = width * 10
        this.canvas.height = height * 10

        const img = new Image(width * 10, height * 10)
        this.context.drawImage(img, 0, 0, img.width * 10, img.height * 10)
        this.context.fillStyle = "black"
        this.context.fillRect(0, 0, img.width * 10, img.height * 10)

        for (let y = 0; y < height; y++)
            for (let x = 0; x < width; x++)
                this.render(x, y)
    }

    render(x: number, y: number, tile = this.grid.getTop(x, y)): void {
        if (!this.context || !this.canvas || tile === false)
            return

        this.context.fillStyle = SwapTable[tile]
        this.context.fillRect(x * 10 + 1, y * 10 + 1, 8, 8)
    }
}