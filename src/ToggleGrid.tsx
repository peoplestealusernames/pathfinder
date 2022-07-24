import { useEffect } from "react"
import { CanvasManager } from "./2d/canvasManger"
import { LayerManger } from "./2d/LayerManger"
import { Selectable, SelectableFnc } from "./backend/types"

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
                throw new Error(`Selection is out of bounds`)

            const selector = document.getElementById("Block selector") as HTMLDivElement
            if (!selector)
                throw new Error("No selector div")

            const selected = selector.getAttribute("data-value") as Selectable
            if (!selected)
                throw new Error("No selected value")

            if (selected === tile)
                throw new Error(`Update blocked {${x},${y}} is already a ${tile}`)

            if (SelectableFnc[selected])
                SelectableFnc[selected](x, y, props.grid, tile)
        }

        //TODO: drag
        elem.addEventListener("mousedown", mouseDown)

        return (() => {
            elem.removeEventListener("mousedown", mouseDown)
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