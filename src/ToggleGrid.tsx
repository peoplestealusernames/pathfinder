import React, { useEffect, useRef, useState } from "react"
import { CanvasManager } from "./2d/canvasManger"
import { LayerManger } from "./2d/LayerManger"
import { Selectable, SelectableFnc } from "./backend/types"
import { CenterDiv } from "./components/CenterDiv"
import { TileCursor } from "./components/Tiles/TileCursor"

export function ToggleGrid(props: {
    grid: LayerManger,
    canvasMang: CanvasManager,
    selectorState: Selectable
    style?: React.CSSProperties
}) {
    const [Hover, setHover] = useState<boolean>(false)

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement
        if (!canvas)
            return

        props.canvasMang.addCanvas(canvas)

        const StartPlace = (e: any) => {
            canvas.addEventListener("mousemove", Place)
        }

        const EndPlace = (e: any) =>
            canvas.removeEventListener("mousemove", Place)

        const Place = (e: any) => {
            console.log("a");

            const elemLeft = canvas.offsetLeft + canvas.clientLeft
            const elemTop = canvas.offsetTop + canvas.clientTop
            const xp = e.pageX - elemLeft
            const yp = e.pageY - elemTop

            const x = Math.floor(xp / 10)
            const y = Math.floor(yp / 10)

            const tile = props.grid.getTop(x, y)

            if (tile === false)
                return console.error(`Selection is out of bounds`)

            if (props.selectorState === tile)
                return console.error(`Update blocked {${x},${y}} is already a ${tile}`)

            if (SelectableFnc[props.selectorState])
                SelectableFnc[props.selectorState](x, y, props.grid, tile)
        }

        //TODO: drag
        canvas.addEventListener("mousedown", StartPlace)
        canvas.addEventListener("mouseup", EndPlace)
        canvas.addEventListener("mouseleave", EndPlace)

        return (() => {
            canvas.removeEventListener("mousedown", StartPlace)
            canvas.removeEventListener("mouseup", EndPlace)
            canvas.removeEventListener("mouseleave", EndPlace)
        })
    })

    return (
        <CenterDiv>
            <canvas style={{
                ...props.style,
                ...{
                    cursor: "none",
                    display: "flex",
                    flexWrap: "nowrap",
                    flexDirection: "row",
                }
            }}
                ref={canvasRef}
                id="GridCanvas" className="DisplayGrid"

                onMouseEnter={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}
            />
            {Hover && <TileCursor tile={props.selectorState} />}
        </CenterDiv>
    )
}