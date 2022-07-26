import { useEffect } from "react"
import { keyLike, SwapTable } from "../../backend/types"


export function TileRender(props: {
    tile: keyLike,
    ID: string,
    style?: React.CSSProperties
}) {
    const ID = props.ID

    useEffect(() => {
        const canvas = document.getElementById(ID) as HTMLCanvasElement

        if (!canvas)
            throw new Error("Could not find canvas")

        const context = canvas.getContext("2d")

        if (!context)
            throw new Error("Could not find context")

        const img = new Image()
        context.drawImage(img, 0, 0)

        context.fillStyle = "black"
        context.fillRect(0, 0, 10, 10)
        context.fillStyle = SwapTable[props.tile]
        context.fillRect(1, 1, 8, 8)

        const scaleFactor = Math.min(canvas.width, canvas.height)
        context.scale(scaleFactor / 10 * 2, scaleFactor / 10)
    }, [ID, props.tile])

    return (
        <canvas style={{
            ...{
                display: "flow",
                width: "50px",
                height: "50px",
                border: "3px solid white",
                margin: "0px",
            }, ...props.style
        }}
            id={ID}
        />
    )
}