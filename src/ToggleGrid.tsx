import React, { useEffect } from "react"
import { CanvasManager } from "./2d/canvasManger"
import { LayerManger } from "./2d/LayerManger"
import { Selectable, SelectableFnc } from "./backend/types"
import { CenterDiv } from "./components/CenterDiv"

export function ToggleGrid(props: {
    grid: LayerManger,
    canvasMang: CanvasManager,
    selectorState: Selectable
    style?: React.CSSProperties
}) {

    useEffect(() => {
        //TODO: pass along
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

            if (props.selectorState === tile)
                throw new Error(`Update blocked {${x},${y}} is already a ${tile}`)

            if (SelectableFnc[props.selectorState])
                SelectableFnc[props.selectorState](x, y, props.grid, tile)
        }

        //TODO: drag
        elem.addEventListener("mousedown", mouseDown)

        return (() => {
            elem.removeEventListener("mousedown", mouseDown)
        })
    })

    return (
        <CenterDiv>
            <canvas style={{
                ...props.style,
                ...{
                    display: "flex",
                    flexWrap: "nowrap",
                    flexDirection: "row",
                }
            }} id="GridCanvas" />
        </CenterDiv>
    )
}