import { useEffect } from "react"
import { SwapTable, Tile } from "./types"

export function ToggleGrid(props: { grid: Tile[][], update: any }) {
    //TODO: make styles (including height from here pass to toggle block)

    useEffect(() => {
        UpdateCanvas(props.grid)
    }, [props.grid])

    useEffect(() => {
        const elem = document.getElementById('GridCanvas') as any
        if (!elem)
            return

        const elemLeft = elem.offsetLeft + elem.clientLeft
        const elemTop = elem.offsetTop + elem.clientTop
        const context = elem.getContext('2d') as CanvasRenderingContext2D

        UpdateCanvas(props.grid)

        elem.addEventListener("click", (e: any) => {
            const x = e.pageX - elemLeft
            const y = e.pageY - elemTop

            console.log("CLICKED");
        }, false)
    })

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

    const img = new Image()
    context.drawImage(img, 0, 0, img.width, img.height)

    for (const xs in grid) {
        const x = parseInt(xs)
        for (const ys in grid[x]) {
            const y = parseInt(ys)
            const tile = grid[x][y]


            context.fillStyle = SwapTable[tile.state]
            context.fillRect(x * 10, y * 10, 10, 10)
        }
    }
}
