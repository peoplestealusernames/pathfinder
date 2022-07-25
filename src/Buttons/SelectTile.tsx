import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Selectable, SelectableArray, SwapTable } from "../backend/types"
import { CenterDiv } from "../components/CenterDiv"

export function SelectTile(props: {
    selectorState: Selectable,
    setSelectorState: Dispatch<SetStateAction<Selectable>>
}) {

    return (
        <div id={"Block selector"} data-value={props.selectorState}
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
                border: "10px solid black",
            }}>
            {SelectableArray.map((tile) => {
                return (
                    <TileBuilder
                        key={`ToggleButton:${tile}`}
                        {...props}
                        tile={tile}
                    />
                )
            })}
        </div >
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
    }, [])

    const [Hover, setHover] = useState<boolean>(false)

    return (
        <div
            style={{
                display: "flex",
                alignSelf: "center",
                flexDirection: "column",
                margin: "5px",
                borderRadius: "10px",
                border: Hover ? "5px solid red" : "5px solid black",
                backgroundColor: props.selectorState === props.tile ? "green" : "grey",
                userSelect: "none"
            }}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            onMouseDown={(e: any) => { props.setSelectorState(props.tile) }}
        >
            <canvas style={{
                display: "flow",
                width: "70px",
                height: "70px",
                margin: "5px"
            }}
                id={ID}
            />
            {props.tile}
        </div >
    )
}