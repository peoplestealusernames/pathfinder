import { useEffect } from "react"
import { CanvasManager } from "./2d/canvasManger"
import { LayerManger } from "./2d/LayerManger"
import { Replaceable, Selectable, SelectableFnc } from "./backend/types"

export function ToggleGrid(props: { grid: LayerManger, canvasMang: CanvasManager }) {
    useEffect(() => {
        const elem = document.getElementById('GridCanvas') as HTMLCanvasElement
        if (!elem)
            return

        props.canvasMang.addCanvas(elem)


        const mouseDown = (e: any) => {
            e.preventDefault()

            const elemLeft = elem.offsetLeft + elem.clientLeft
            const elemTop = elem.offsetTop + elem.clientTop
            const xp = e.pageX - elemLeft
            const yp = e.pageY - elemTop

            const x = Math.floor(xp / 10)
            const y = Math.floor(yp / 10)

            const tile = props.grid.getTop(x, y)

            if (tile === false)
                throw new Error(`Tile not found at ${x},${y}`)

            if (!Replaceable[tile])
                throw new Error(`Tile at ${x},${y}(${tile}) is not replaceable`)

            const selector = document.getElementById("Block selector") as HTMLDivElement
            if (!selector)
                throw new Error("No selector div")

            const selected = selector.getAttribute("data-value") as Selectable
            if (!selected)
                throw new Error("No selected value")

            if (SelectableFnc[selected]) {
                SelectableFnc[selected](x, y, props.grid)
            }
        }

        //TODO: drag
        elem.addEventListener("click", mouseDown)

        return (() => {
            elem.removeEventListener("click", mouseDown)
        })
    })

    return (
        <div key={`A`} style={{
            margin: "0px", padding: "15px",
            display: "flex", flexWrap: "nowrap", flexDirection: "row",
            justifyContent: "center"
        }}>
            <canvas style={{ display: "flow" }} id="GridCanvas" />
        </div>
    )
}