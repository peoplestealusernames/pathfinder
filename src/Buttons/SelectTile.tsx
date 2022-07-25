import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Selectable, SelectableArray, SwapTable } from "../backend/types"
import { StyledTab } from "../components/StyledTab"

export function SelectTile(props: {
    selectorState: Selectable,
    setSelectorState: Dispatch<SetStateAction<Selectable>>
}) {

    return (
        <StyledTab title="Tile Selector">
            {
                SelectableArray.map((tile) => {
                    return (
                        <TileBuilder
                            key={`ToggleButton:${tile}`}
                            {...props}
                            tile={tile}
                        />
                    )
                })
            }
        </StyledTab>
    )
}

function TileBuilder(props: {
    tile: Selectable,
    selectorState: Selectable
    setSelectorState: Dispatch<SetStateAction<Selectable>>
}) {
    const ID = `ToggleButton:${props.tile}:Canvas`

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

    const [Hover, setHover] = useState<boolean>(false)

    return (
        <div
            style={{
                display: "flex",
                alignSelf: "center",
                flexDirection: "column",
                margin: "3px",
                padding: "2px",
                borderRadius: "0px",
                border: Hover ? "2px solid red" : "2px solid white",
                backgroundColor: props.selectorState === props.tile ? "darkgoldenrod" : "#484848",
                userSelect: "none"
            }}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            onMouseDown={(e: any) => { props.setSelectorState(props.tile) }}
        >
            <canvas style={{
                display: "flow",
                width: "50px",
                height: "50px",
                margin: "2px"
            }}
                id={ID}
            />
            <p style={{
                margin: "1px",
                color: "white",
                fontSize: "13px"
            }} >
                {props.tile}
            </p>
        </div >
    )
}