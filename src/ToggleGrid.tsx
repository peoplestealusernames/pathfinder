import { useEffect } from "react"
import { SwapTable, Tile } from "./types"

export function ToggleGrid(props: { grid: Tile[][], update: any }) {
    //TODO: make styles (including height from here pass to toggle block)

    useEffect(() => {
        UpdateCanvas(props.grid)
        const elem = document.getElementById('GridCanvas')
        if (!elem)
            return

        const elemLeft = elem.offsetLeft + elem.clientLeft
        const elemTop = elem.offsetTop + elem.clientTop
        //@ts-ignore
        const context = elem.getContext('2d') as CanvasRenderingContext2D

        UpdateCanvas(props.grid)

        const mouseDown = (e: any) => {
            e.preventDefault()
            const xp = e.pageX - elemLeft
            const yp = e.pageY - elemTop

            const x = Math.floor(xp / 10)
            const y = Math.floor(yp / 10)

            const tile = props.grid[x][y]

            if (tile.state == "wall")
                tile.state = "empty"
            else if (tile.state == "empty")
                tile.state = "wall"

            console.log(`Update: ${x},${y} is now ${tile.state}`);

            props.update();
        }

        elem.addEventListener("click", mouseDown)

        return (() => { elem.removeEventListener("click", mouseDown) })
    }, [props.grid])

    return (
        <div key={`A`} style={{
            margin: "0px", padding: "0px",
            display: "flex", flexWrap: "nowrap", flexDirection: "row",
            justifyContent: "center"
        }}>
            <canvas style={{ display: "flow" }} id="GridCanvas" />
        </div>
    )
}

function UpdateCanvas(grid: Tile[][]) {
    const elem = document.getElementById('GridCanvas') as any
    if (!elem)
        throw new Error("Cannot find canvas")

    //TODO: scale to size
    //TODO:math to make them aways square and always right size
    const width = grid.length * 10
    const height = grid[0].length * 10

    elem.width = width
    elem.height = height

    const context = elem.getContext('2d') as CanvasRenderingContext2D

    const img = new Image(width, height)
    context.drawImage(img, 0, 0, img.width, img.height)
    context.fillStyle = "black"
    context.fillRect(0, 0, img.width, img.height)

    for (const xs in grid) {
        const x = parseInt(xs)
        for (const ys in grid[x]) {
            const y = parseInt(ys)
            const tile = grid[x][y]


            context.fillStyle = SwapTable[tile.state]
            context.fillRect(x * 10 + 1, y * 10 + 1, 8, 8)
        }
    }
}

function UpdateSquare(grid: Tile[][], x: number, y: number) {
    const elem = document.getElementById('GridCanvas') as any
    if (!elem)
        throw new Error("Cannot find canvas")

    const context = elem.getContext('2d') as CanvasRenderingContext2D
    context.fillStyle = SwapTable[grid[x][y].state]
    context.fillRect(x * 10 + 1, y * 10 + 1, 8, 8)
}