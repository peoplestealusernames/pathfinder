import { useEffect } from "react"
import { CanvasGrid, UpdateCanvas } from "./canvas"

export function ToggleGrid(props: { grid: CanvasGrid }) {
    useEffect(() => {
        const elem = document.getElementById('GridCanvas') as HTMLCanvasElement
        if (!elem)
            return

        props.grid.addCanvas(elem)

        const elemLeft = elem.offsetLeft + elem.clientLeft
        const elemTop = elem.offsetTop + elem.clientTop

        const mouseDown = (e: any) => {
            e.preventDefault()
            const xp = e.pageX - elemLeft
            const yp = e.pageY - elemTop

            const x = Math.floor(xp / 10)
            const y = Math.floor(yp / 10)

            const tile = props.grid.get(x, y)

            if (tile == "wall")
                props.grid.set(x, y, "empty")
            else if (tile == "empty")
                props.grid.set(x, y, "wall")

            console.log(`Update: ${x},${y} is now ${tile}`);
        }

        elem.addEventListener("click", mouseDown)

        return (() => { elem.removeEventListener("click", mouseDown) })
    }, [props.grid])

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