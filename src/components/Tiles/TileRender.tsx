import { useEffect, useRef } from "react"
import { keyLike, SwapTable } from "../../backend/types"


export function TileRender(props: {
    tile: keyLike,
    style?: React.CSSProperties
}) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement

        if (!canvas)
            throw new Error("Could not find canvas")

        const context = canvas.getContext("2d")

        if (!context)
            throw new Error("Could not find context")

        canvas.width = 10
        canvas.height = 10

        context.fillStyle = "black"
        context.fillRect(0, 0, 10, 10)
        context.fillStyle = SwapTable[props.tile]
        context.fillRect(1, 1, 8, 8)
    }, [props.tile, canvasRef])

    return (
        <canvas
            ref={canvasRef}
            style={{
                ...{
                    display: "flow",
                    width: "50px",
                    height: "50px",
                    border: "3px solid white",
                    margin: "0px",
                }, ...props.style
            }}
        />
    )
}