import { useEffect } from "react"
import { CanvasGrid } from "./canvas"
import { Replaceable, validState } from "./types"

export function ToggleGrid(props: { grid: CanvasGrid }) {
    useEffect(() => {
        const elem = document.getElementById('GridCanvas') as HTMLCanvasElement
        if (!elem)
            return

        props.grid.addCanvas(elem)


        const mouseDown = (e: any) => {
            e.preventDefault()

            const elemLeft = elem.offsetLeft + elem.clientLeft
            const elemTop = elem.offsetTop + elem.clientTop
            const xp = e.pageX - elemLeft
            const yp = e.pageY - elemTop

            const x = Math.floor(xp / 10)
            const y = Math.floor(yp / 10)

            const tile = props.grid.get(x, y)

            if (!tile)
                throw new Error(`Tile not found at ${x},${y}`)

            if (!Replaceable[tile])
                throw new Error(`Tile at ${x},${y}(${tile}) is not replaceable`)

            const selector = document.getElementById("Block selector") as HTMLDivElement
            if (!selector)
                throw new Error("No selector div")

            const selected = selector.getAttribute("data-value") as validState
            if (!selected)
                throw new Error("No selected value")

            props.grid.set(x, y, selected, true)
        }

        elem.addEventListener("click", mouseDown)

        return (() => { elem.removeEventListener("click", mouseDown) })
    })

    return (
        <div key={`A`} style={{
            margin: "0px", padding: "20px",
            display: "flex", flexWrap: "nowrap", flexDirection: "row",
            justifyContent: "center"
        }}>
            <canvas style={{ display: "flow" }} id="GridCanvas" />
        </div>
    )
}